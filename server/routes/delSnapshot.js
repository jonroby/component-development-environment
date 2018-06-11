const fs = require('fs');
const filepaths = require("../config/filepaths");
const createFakeProps = require("../createFakeProps");

async function delSnapshot(ctx) {
  const customTypes = JSON.parse(
    fs.readFileSync(filepaths.customTypes, "utf8")
  );

  const newComponentCustomTypes = Object.keys(customTypes[ctx.params.component])
    .filter(k => k !== ctx.params.snapshot)
    .reduce((acc, curr) => {
      return Object.assign({}, acc, {
        [curr]: customTypes[ctx.params.component][curr]
      });
    }, {});

  // const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);
  const newCustomTypes = Object.assign({}, customTypes, {
    [ctx.params.component]: newComponentCustomTypes
  });

  // TODO: error handling and read from the saved file
  fs.writeFileSync(
    filepaths.customTypes,
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Repeat steps from getComponentData

  // 1
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots["default"].snapshot;

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = {
    fakeProps,
    snapshot,
    snapshotNames,
    propsAst,
    selectedSnapshot: "default"
  };
}

module.exports = delSnapshot;
