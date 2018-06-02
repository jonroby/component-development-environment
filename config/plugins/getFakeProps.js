const faker = require("faker");
const changeCase = require("change-case");

// mutates object! 
function getFakeProps(flowDoc) {
  // TODO: Do better
  const copy = JSON.parse(JSON.stringify(flowDoc));
  Object.keys(copy.props).forEach(propName => {
    const prop = copy.props[propName];

    console.log("prop ", prop);

    const fakeProp = getFakeItem(propName, prop);
    prop.fakeProp = fakeProp;
  });

  return copy;
}

function getPrimitive() {}

function getFakeItem(propName, prop) {
  // console.log("prop ", prop.flowType.name);

  switch (changeCase.lowerCase(prop.flowType.name)) {
    case "number":
      return getNumber(propName, prop);
      break;
    case "string":
      return getString(propName, prop);
      // return getString(propName, prop);
      break;
    case "boolean":
      return getBoolean(propName, prop);
      break;
    case "void":
      break;
    case "array":
      break;
    case "object":
      break;
    case "union":
      break;
    default:
      console.log("No match.");
  }
}

function getNumber(propName, prop) {
  // TODO: regex on propName and use a corresponding faker function if match

  return faker.random.number();
}

function getString(propName, prop) {
  // TODO: regex on propName and use a corresponding faker function if match

  return faker.random.word();
}

function getBoolean(propName, prop) {
  // TODO: Figure out a sensible way to store both true and false
  return faker.random.boolean();
}

function getLiteralsAndUnion() {
  // TODO: literals and union
  // flowDoc.props['primitive'].flowType.name
  // flowDoc.props['primitive'].flowType.elements
  // [ { name: 'literal', value: '\'string\'' },
  //   { name: 'literal', value: '\'otherstring\'' },
  //   { name: 'number' } ]
}

function getArr() {}

function getObj() {}

module.exports = getFakeProps;
