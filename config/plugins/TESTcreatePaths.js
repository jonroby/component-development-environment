const fs = require("fs");
const faker = require("faker");
const changeCase = require("change-case");
const reactDocs = require("react-docgen");

function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

function createFakeProps(file, opts) {
  const flowData = reactDocs.parse(file);

  const fakeComponentProps = Object.keys(flowData.props).reduce(
    (acc, propKey) => {
      const prop = flowData.props[propKey];
      const path = propKey;

      const paths = {};

      const fakeProp = createFakeProp(prop.flowType, paths, path);

      console.log('fakeProp ', fakeProp)
      console.log('path ', paths)

      return Object.assign({}, acc, fakeProp);
    },
    {}
  );

  console.log('fakeComponentProps ', fakeComponentProps)

  return fakeComponentProps;
}

function createFakeProp(prop, paths, path) {
  switch (changeCase.lowerCase(prop.name)) {
    case "number":
      return createNumber(prop, paths, path + '/number');

    case "string":
      return createString(prop, paths, path + '/string');

    case "boolean":
      return createBoolean(prop, paths, path + '/boolean');

    case "void":
      return null; // undefined?

    case "array":
      return createArray(prop, paths, path + '/array');

    case "signature":
      if (prop.type === "object") {
        return createObject(prop, paths, path + '/object');
      } else if (prop.type === "function") {
        return createFunction(prop, paths, path + '/function');
      }

    case "union":
      return createUnion(prop, paths, path + '/union');

    case "literal":
      // TODO: react-docgen changes true to 'true', 1 to '1', 'hello' to '"hello"'
      return createLiteral(prop, paths, path + '/literal');

    default:
      console.log("No match.");
  }
}

function createNumber(prop, paths, path) {
  return { [path]: 'default' };
}

function createString(prop, paths, path) {
  return { [path]: 'default' };
}

function createBoolean(prop, paths, path) {
  return { [path]: 'default' };
}

function createLiteral(prop, paths, path) {
  if (prop.elements) {
    return prop.elements.reduce(p => {
      return createFakeProp(p, paths, path);
    });
  }
  console.log('path createLiteral ', path)

  return { [path]: 'default' };
}

function createUnion(prop, paths, path) {
  // return createFakeProp(prop.elements[0], paths, path);
  console.log('path union', path)
  const red = prop.elements.reduce((acc, curr) => {
    let el = createFakeProp(curr, paths, path);
    return Object.assign({}, acc, el);
  }, {});

  return { [path]: red };
}

function createArray(prop, paths, path) {
  // return prop.elements.reduce((element) => {
  //   const fakeProp = createFakeProp(element, paths, path);
  //   return fakeProp;
  // }, []);

  const red = prop.elements.reduce((acc, curr) => {
    let el = createFakeProp(curr, paths, path);
    return Object.assign({}, acc, el);
  }, {});

  return { [path]: red };
}

function createObject(prop, paths, path) {
  const { properties } = prop.signature;
  const red = properties.reduce((acc, curr) => {
    const addPath = isObject(curr.key) ? `/object/${curr.key}` : `/${curr.key}`; 
    const keyVal = {
      [curr.key]: createFakeProp(curr.value, paths, path + addPath)
    };

    return Object.assign({}, acc, keyVal);
  }, {});

  return { [path]: red };
}

function createFunction(prop, paths, path) {
  const { properties } = prop.signature;
  const ret = createFakeProp(prop.signature.return);
  return () => ret;
}

// const file = fs.readFileSync("./reactComponent.js");

// createFakeProps(file);

module.exports = createFakeProps;
