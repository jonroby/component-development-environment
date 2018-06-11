const fs = require('fs');
const filepaths = require("../config/filepaths");
const createFakeProps = require("../createFakeProps");

async function getComponentData(ctx) {
  // 1: Get comp flow props (props ast)
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2: Get snapshots (custom types)
  const selectedSnapshot = ctx.query.snapshot ? ctx.query.snapshot : "default";
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[selectedSnapshot].snapshot;

  // 3: Generate fake data (fake props)

  let ast = selectedSnapshot === "default" ? propsAst : snapshots[selectedSnapshot].propsAst;
  const fakeProps = createFakeProps(ast, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, propsAst: ast };
}

module.exports = getComponentData;
