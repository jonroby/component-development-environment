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
      if (!opts[path].isPresent) return acc;

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

function createNumber(prop, opts, path) {
  if (opts[path]) {
    if (!opts[path].isSelected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    if (opts[path].section && opts[path].item) {
      return faker[opts[path].section][opts[path].item]();
    }
  }

  return faker.random.number();
}

function createString(prop, opts, path) {
  if (opts[path]) {
    if (!opts[path].isSelected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    if (opts[path].section && opts[path].item) {
      return faker[opts[path].section][opts[path].item]();
    }
  }

  return faker.random.word();
}

function createBoolean(prop, opts, path) {
  // TODO: Figure out a sensible way to store both true and false
  if (opts[path]) {
    if (!opts[path].isSelected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return null;

    if (opts[path].value) return opts[path].value;
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
    if (!opts[path].isSelected) return FILTER_THIS_ITEM;

    if (!opts[path].isPresent) return FILTER_THIS_ITEM;
  }

  const pathArr = path.split("/");
  const itemHoldingUnion = pathArr[pathArr.length - 2];

  if (itemHoldingUnion === "array") {
    return prop.elements
      .map(element => {
        return createFakeProp(element, opts, path);
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
  "uniArray/array/union/string": { isSelected: false, isPresent: true },
  "uniArray/array/union/number": { isSelected: false, isPresent: true },
  "uniArray/array/union/boolean": { isSelected: true, isPresent: true },
  "test": { isSelected: true, isPresent: true }
};

// const file = fs.readFileSync("./reactComponent.js");
// const fp = createFakeProps(reactDocs.parse(file), opts);

module.exports = createFakeProps;
