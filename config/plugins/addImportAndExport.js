const { transform } = require('babel-core');

const getFilesToUpdate = (itemsInFile, itemsInDirectory) => {
  const itemsInFileDict = {};
  itemsInFile.forEach((file, i) => {
    itemsInFileDict[file] = true;
  });

  const files = itemsInDirectory
    .filter(file => !itemsInFileDict[file]);

  return files;
}

const addImportAndExport = (filenames) => ({ types: t, template }) => {
  return {
    visitor: {
      Program(path) {
        if (!(path && path.node && path.node.body)) return;

        const itemsInFile = path.node.body
              .map(f => {
                return f.source && f.source.value.split('/')[1];
              })
              .filter(f => f);

        const itemsInDirectory = filenames
              .filter(f => f.match(/js/) && f !== 'index.js')
              .map(f => `${f.split('.')[0]}`);

        const filesToImport = getFilesToUpdate(itemsInFile, itemsInDirectory);

        if (filesToImport.length === 0) return;

        const newImports = path.node.body.reduce((prev, curr) => {
          const imp = prev
                && prev[prev.length-1]
                && prev[prev.length-1].type === 'ImportDeclaration'; // add other import types here
          const exp = curr.type !== 'ImportDeclaration';
          const lastImport = imp && exp;

          if (lastImport) {
            const impDecl = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(filesToImport[0]))],
              t.stringLiteral(`./${filesToImport[0]}`)
            );

            return prev.concat(impDecl).concat(curr);
          }

          return prev.concat(curr);
        }, []);

        path.node.body = newImports;
      },

      ExportDeclaration(path) {
        if (!(path.node && path.node.specifiers)) return;

        const exps = path.node.specifiers.map(p => p.local.name);

        const itemsInDirectory = filenames
              .filter(f => f.match(/js/) && f !== 'index.js')
              .map(f => `${f.split('.')[0]}`);

        const filesToUpdate = getFilesToUpdate(exps, itemsInDirectory);

        if (filesToUpdate.length === 0) return;

        const newExp = t.exportSpecifier(
          t.identifier(filesToUpdate[0]),
          t.identifier(filesToUpdate[0])
        );

        path.node.specifiers.push(newExp);
      }
    },
  }
}

const transformFileString = (fileString, plugin, opts) => {
  return transform(fileString, {
    parserOpts: {
      sourceType: "module",
      plugins: [
        "jsx",
        "flow"
      ]
    },
    plugins: [plugin(opts)]
  });
};

module.exports = { addImportAndExport, transformFileString };
