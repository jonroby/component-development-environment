const fs = require("fs");
const faker = require("faker");
const changeCase = require("change-case");
const reactDocs = require("react-docgen");

const FILTER_THIS_ITEM = "FILTER_THIS_ITEM";

function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function createFakeProps(propsAst, opts = {}) {
  const fakeComponentProps = Object.keys(propsAst.props).reduce(
    (acc, propKey) => {
      const prop = propsAst.props[propKey];
      const path = propKey;

      if (opts[path] && opts[path].isNull) return acc;

      const fakeProp = createFakeProp(prop.flowType, opts, path);

      const obj = { [propKey]: fakeProp };
      return Object.assign({}, acc, obj);
    },
    {}
  );

  return fakeComponentProps;
}

function createFakeProp(prop, opts, path) {
  switch (changeCase.lowerCase(prop.name)) {
    case "number":
      return createNumber(prop, opts, path + "/number");

    case "string":
      return createString(prop, opts, path + "/string");

    case "boolean":
      return createBoolean(prop, opts, path + "/boolean");

    case "void":
      return null; // undefined?

    case "array":
      return createArray(prop, opts, path + "/array");

    case "signature":
      if (prop.type === "object") {
        return createObject(prop, opts, path + "/object");
      } else if (prop.type === "function") {
        return createFunction(prop, opts, path + "/function");
      }

    case "union":
      return createUnion(prop, opts, path + "/union");

    case "literal":
      return createLiteral(prop);

    default:
      console.log("No match.");
  }
}

// TODO: regex on propKey and use a corresponding faker function if match
function createNumber(prop, opts, path) {
  if (opts[path] && opts[path] !== "default") {
    if (opts[path].unselected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    if (opts[path].section && opts[path].item) {
      return faker[opts[path].section][opts[path].item]();
    }
  }

  return faker.random.number();
}

function createString(prop, opts, path) {
  if (opts[path] && opts[path] !== "default") {
    if (opts[path].unselected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    if (opts[path].section && opts[path].item) {
      return faker[opts[path].section][opts[path].item]();
    }
  }

  return faker.random.word();
}

function createBoolean(prop, opts, path) {
  // TODO: Figure out a sensible way to store both true and false
  if (opts[path] && opts[path] !== "default") {
    if (opts[path].unselected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    return opts[path].item;
  }
  return faker.random.boolean();
}

function createLiteral(prop, opts, path) {
  if (prop.elements) {
    return prop.elements.map(p => {
      return createFakeProp(p);
    });
  }

  return prop.value;
}

function createUnion(prop, opts, path) {
  if (opts[path]) {
    if (opts[path].unselected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return FILTER_THIS_ITEM;
  }

  // check if previous item is array
  console.log("prop ", prop);
  console.log("opts ", opts);
  console.log("path ", path);

  // check if union is for a prop type or an array
  // they behave very differently
  const pathArr = path.split("/");
  const itemHoldingUnion = pathArr[pathArr.length - 2];

  if (itemHoldingUnion === "array") {
    return prop.elements
      .map(element => {
        const fakeProp = createFakeProp(element, opts, path);
        return fakeProp;
      })
      .filter(i => i !== FILTER_THIS_ITEM);
  } else {
    return createFakeProp(prop.elements[0], opts, path + "/union");
  }
}

function createArray(prop, opts, path) {
  if (opts[path]) {
    if (!opts[path].isPresent) return FILTER_THIS_ITEM;
  }

  return prop.elements
    .map(element => {
      if (element.name === "union") {
        return { union: createFakeProp(element, opts, path) };
      } else if (element.name === "Array") {
        return { array: createFakeProp(element, opts, path) };
      }
      return createFakeProp(element, opts, path);
    })
    .reduce((acc, curr) => {
      if (curr.union) {
        return acc.concat(curr.union);
      } else if (curr.array) {
        return acc.concat([curr.array]);
      } else {
        return acc.concat(curr);
      }
    }, []);
}

function createObject(prop, opts, path) {
  if (opts[path]) {
    if (opts[path].isPresent !== undefined && !opts[path].isPresent) return FILTER_THIS_ITEM;
  }

  const { properties } = prop.signature;
  return properties.reduce((acc, curr) => {
    const addPath = isObject(curr.key) ? `/object/${curr.key}` : `/${curr.key}`;

    if (opts[path + addPath]) {
      if (opts[path + addPath].isPresent !== undefined && !opts[path + addPath].isPresent) return acc;
    }

    const keyVal = {
      [curr.key]: createFakeProp(curr.value, opts, path + addPath)
    };

    return Object.assign({}, acc, keyVal);
  }, {});
}

function createFunction(prop, opts, path) {
  const { properties } = prop.signature;
  const ret = createFakeProp(prop.signature.return);
  return () => ret;
}

const opts = {
  // 'username/string': { section: 'internet' , item: 'userName' },
  // 'isSubscriber/boolean': { section: 'boolean' , item: 'true' },
  // 'id/number': { section: 'random' , item: 'uuid' },
  // 'favoriteWebsites/array/string': { section: 'date', item: 'past' },
  // 'userData/object/thing1/string': { section: 'finance', item: 'currencyName'},
  // 'userData/object/thing2/number': { section: 'commerce', item: 'price'},
  // 'userData/object/thing3/object/nestedStr/string': { section: 'finance', item: 'currencyName'},
  // 'userData/object/thing3/object/nestedArr/array/string': { section: 'address', item: 'zipCode'},
  // 'userData/object/thingArr/array/array/number': { section: 'random', item: 'uuid'},
  // union: { section: "internet", item: "userName" },
  // "unionArr/array/union/string": {
  //   section: "random",
  //   item: "uuid",
  //   create: false
  // },
  // "unionArr/array/union/number": {
  //   section: "date",
  //   item: "past",
  //   create: false
  // },
  // "unionArr/array/union/array": {
  //   section: "date",
  //   item: "past",
  //   create: false
  // }
  // "unionArr/array": {
  //   section: "date",
  //   item: "past",
  //   create: false,
  //   isNull: true
  // },
  "obj/object/objOptionalKey": { isPresent: true },
  "obj/object/objOptionalKey/string": { isPresent: false },
  // optionalKey: { isPresent: true }
};

// const file = fs.readFileSync("./reactComponent.js");
// const fp = createFakeProps(reactDocs.parse(file), opts);
// console.log("fp ", fp);
// console.log("fp.unionTest ", fp.unionTest);

module.exports = createFakeProps;
