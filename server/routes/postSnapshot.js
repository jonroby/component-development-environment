const fs = require('fs');
const filepaths = require("../config/filepaths");
const createFakeProps = require("../createFakeProps");

async function postSnapshot(ctx) {
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  const body = ctx.request.body;
  const customTypes = JSON.parse(
    fs.readFileSync(filepaths.customTypes, "utf8")
  );

  const snapshotName =
    body.name !== "default" && body.name !== ctx.params.snapshot
      ? body.name
      : "snapshot_" +
        (Object.keys(customTypes[ctx.params.component])
          .filter(name => name.match(/snapshot_[0-9]+/))
          .map(name => Number(name.split("_")[1]))
          .reduce((acc, curr) => (curr > acc ? curr : acc), 0) +
          1);

  const currentSnapshot =
    customTypes[ctx.params.component][ctx.params.snapshot].snapshot ||
    customTypes[ctx.params.component]["default"];
  const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);

  const newPropsAst = body.name === "default"
    ? propsAst
    : customTypes[ctx.params.component][ctx.params.snapshot].propsAst;
  const newSnapshotWithKey = {
    [snapshotName]: {
      snapshot: newSnapshot,
      propsAst: newPropsAst
    }
  };

  const newComponent = {
    [ctx.params.component]: Object.assign(
      {},
      customTypes[ctx.params.component],
      newSnapshotWithKey
    )
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
  // This step is carried out above
  // const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  // const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[ctx.params.snapshot].snapshot;

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, newPropsAst };
}

module.exports = postSnapshot;
