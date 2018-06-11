const fs = require("fs");
const filepaths = require("../config/filepaths");
const createFakeProps = require("../createFakeProps");

async function putSnapshot(ctx) {
  // old step 1 from below
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  const body = ctx.request.body;

  const customTypes = JSON.parse(
    fs.readFileSync(filepaths.customTypes, "utf8")
  );

  const snapshotName = body.name;
  const base = customTypes[ctx.params.component][ctx.params.snapshot];
  const currentSnapshot = base.snapshot;
  const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);

  const newSnapshotWithKey = {
    [snapshotName]: {
      snapshot: newSnapshot,
      propsAst: base.propsAst
    }
  };

  let editedCustomType = Object.assign(
    {},
    customTypes[ctx.params.component],
    newSnapshotWithKey
  );

  // if the name is being edited, remove the old name (filter it out when creating new object)
  if (body.name !== ctx.params.snapshot) {
    editedCustomType = Object.keys(editedCustomType).reduce((acc, curr) => {
      if (curr === ctx.params.snapshot) return acc;
      return Object.assign({}, acc, { [curr]: editedCustomType[curr] });
    }, {});
  }

  const newComponent = {
    [ctx.params.component]: editedCustomType
  };

  const newCustomTypes = Object.assign({}, customTypes, newComponent);

  fs.writeFileSync(
    filepaths.customTypes,
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Now repeat steps in getComponentData
  // TODO: Put this into single helper function

  // 1
  // const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  // const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[snapshotName].snapshot;
  console.log("snapshot ", snapshots[snapshotName]);

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = {
    fakeProps,
    snapshot,
    snapshotNames,
    propsAst,
    selectedSnapshot: snapshotName
  };
}

module.exports = putSnapshot;
