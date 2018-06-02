const fs = require("fs");
const reactDocs = require("react-docgen");
const {
  transformFileString,
  addImportAndExport
} = require("./addImportAndExport");
const createPaths = require("./TESTcreatePaths");

// will need to pass config routes
// use ./src/components as default
const config = {
  path: "./src/components/",
  indexPath: "./src/components/index.js",
  propsAsts: "./server/flow/flow_asts.js",
  customTypes: "./server/flow/custom_types.js"
};

const cache = {
  lastIndexFile: ""
};

function updateIndexFile(cache, files) {
  // TODO: remove imports if they're aren't in directory
  const indexFile = fs.readFileSync(config.indexPath, "utf8");
  if (indexFile !== cache.indexFile) {
    const t = transformFileString(indexFile, addImportAndExport, files);

    if (t && t.code) {
      // TODO: Handle error
      fs.writeFileSync(config.indexPath, t.code);
      cache.indexFile = indexFile;
    }
  }
}

function updatePropsAsts(jsFileStrings) {
  const jsFileMetadata = jsFileStrings.map(file => {
    return Object.assign({}, reactDocs.parse(file.filecontents), {
      filecontents: file.filecontents
    });
  });

  const returnObj = {};
  jsFileMetadata.forEach(i => {
    returnObj[i.displayName] = i;
  });

  return returnObj;
}

function updateCustomTypes(filepath, component) {

}



// Three Jobs
// 1 Update Indexfile (this action NEEDS to be cached or else an infinite loop)
// 2 Write to props ast (this will happen every time)
// 3 Write "default" for custom types (this will happen every time)
function CdePlugin(options) {}

// TODO: How to read from compiler instead of using fs to read
CdePlugin.prototype.apply = function(compiler) {
  compiler.plugin("compile", function(compilationParams) {
    const filesInSrc = fs.readdirSync(config.path);

    const jsFileStrings = filesInSrc
      .filter(file => file.match(/.js/) !== null)
      .map(filename => {
        const filecontents = fs.readFileSync(config.path + filename, "utf8");
        return { filename, filecontents };
      })
      .filter(file => file.filecontents.match(/\/\/ @flow/) !== null);

    const updatedPropsAsts = updatePropsAsts(jsFileStrings, cache);
    fs.writeFileSync(
      config.propsAsts,
      JSON.stringify(updatedPropsAsts),
      "utf8"
    );

    updateIndexFile(cache, jsFileStrings.map(i => i.filename));

    // updating customTypes
    // first check if file exists
    const customTypes = fs.existsSync(config.customTypes)
      ? JSON.parse(fs.readFileSync(config.customTypes, "utf8"))
      : {};
    const defaults = Object.keys(updatedPropsAsts).reduce((acc, curr) => {
      return Object.assign({}, acc, {
        [curr]: createPaths(updatedPropsAsts[curr])
      });
    }, {});

    Object.keys(defaults).forEach(d => {
      if (customTypes[d]) {
        customTypes[d]["default"] = defaults[d];
      } else {
        customTypes[d] = { default: defaults[d] };
      }
    });

    let customTypesString = JSON.stringify(customTypes);
    fs.writeFileSync(config.customTypes, customTypesString, "utf8");
  });
};

module.exports = CdePlugin;
