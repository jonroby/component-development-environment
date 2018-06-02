const fs = require("fs");
const faker = require("faker");
const changeCase = require("change-case");
const reactDocs = require("react-docgen");

function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

function createFakeProps(propsAst, opts={}) {
  const fakeComponentProps = Object.keys(propsAst.props).reduce(
    (acc, propKey) => {
      const prop = propsAst.props[propKey];
      const path = propKey;

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
      return createNumber(prop, opts, path + '/number');

    case "string":
      return createString(prop, opts, path + '/string');

    case "boolean":
      return createBoolean(prop, opts, path + '/boolean');

    case "void":
      return null; // undefined?

    case "array":
      return createArray(prop, opts, path + '/array');

    case "signature":
      if (prop.type === "object") {
        return createObject(prop, opts, path + '/object');
      } else if (prop.type === "function") {
        return createFunction(prop, opts, path + '/function');
      }

    case "union":
      return createUnion(prop, opts, path + '/union');

    case "literal":
      // TODO: react-docgen changes true to 'true', 1 to '1', 'hello' to '"hello"'
      return createLiteral(prop);

    default:
      console.log("No match.");
  }
}

// TODO: regex on propKey and use a corresponding faker function if match
function createNumber(prop, opts, path) {
  if (opts[path] && opts[path] !== 'default') {
    return faker[opts[path].section][opts[path].item]();
  }

  return faker.random.number();
}

function createString(prop, opts, path) {
  if (opts[path] && opts[path] !== 'default') {
    let f = faker[opts[path].section][opts[path].item]();
    return f;
  }

  return faker.random.word();
}

function createBoolean(prop, opts, path) {
  // TODO: Figure out a sensible way to store both true and false
  if (opts[path] && opts[path] !== 'default') {
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
  return createFakeProp(prop.elements[0], opts, path);
}

function createArray(prop, opts, path) {
  return prop.elements.map((element) => {
    const fakeProp = createFakeProp(element, opts, path);
    return fakeProp;
  }, []);
}

function createObject(prop, opts, path) {
  const { properties } = prop.signature;
  return properties.reduce((acc, curr) => {
    const addPath = isObject(curr.key) ? `/object/${curr.key}` : `/${curr.key}`; 
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

// const opts = {
//   'username/string': { section: 'internet' , item: 'userName' },
//   'isSubscriber/boolean': { section: 'boolean' , item: 'true' },
//   'id/number': { section: 'random' , item: 'uuid' },
//   'favoriteWebsites/array/string': { section: 'date', item: 'past' },
//   'userData/object/thing1/string': { section: 'finance', item: 'currencyName'},
//   'userData/object/thing2/number': { section: 'commerce', item: 'price'},
//   'userData/object/thing3/object/nestedStr/string': { section: 'finance', item: 'currencyName'},
//   'userData/object/thing3/object/nestedArr/array/string': { section: 'address', item: 'zipCode'},
//   'userData/object/thingArr/array/array/number': { section: 'random', item: 'uuid'},
// }

// createFakeProps(file, opts);

module.exports = createFakeProps;
