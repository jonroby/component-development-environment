const fs = require("fs");
const Koa = require("koa");
const router = require("koa-router")();
const koaBody = require("koa-body");
const cors = require("@koa/cors");
// const logger = require('koa-logger');
const createFakeProps = require("./createFakeProps");
const app = (module.exports = new Koa());

// app.use(logger());
app.use(cors());
app.use(koaBody());

router
  .get("/component_data/:component", getComponentData)
  .post("/snapshots/:component/:snapshot", postSnapshot)
  .put("/snapshots/:component/:snapshot", putSnapshot)
  .del("/snapshots/:component/:snapshot", delSnapshot);

app.use(router.routes());

async function getComponentData(ctx) {
  // 1: Get comp flow props (props ast)
  const propsAsts = fs.readFileSync("./flow/flow_asts.js", "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2: Get snapshots (custom types)
  const selectedSnapshot = ctx.query.snapshot ? ctx.query.snapshot : "default";
  const snapshots = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  )[ctx.params.component];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[selectedSnapshot];

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, propsAst };
}

async function postSnapshot(ctx) {
  const body = ctx.request.body;
  const customTypes = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  );

  const snapshotName =
    "snapshot_" +
    (Object.keys(customTypes[ctx.params.component])
      .filter(name => name.match(/snapshot_[0-9]+/))
      .map(name => Number(name.split("_")[1]))
      .reduce((acc, curr) => (curr > acc ? curr : acc), 0) +
      1);

  const currentSnapshot =
    customTypes[ctx.params.component][ctx.params.snapshot] ||
    customTypes[ctx.params.component]["default"];
  const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);

  const newSnapshotWithKey = { [snapshotName]: newSnapshot };

  const newComponent = {
    [ctx.params.component]: Object.assign(
      {},
      customTypes[ctx.params.component],
      newSnapshotWithKey
    )
  };

  const newCustomTypes = Object.assign({}, customTypes, newComponent);

  console.log("newCustomTypes ", newCustomTypes);

  fs.writeFileSync(
    "./flow/custom_types.js",
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Now repeat steps in getComponentData
  // TODO: Put this into single helper function

  // 1
  const propsAsts = fs.readFileSync("./flow/flow_asts.js", "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  )[ctx.params.component];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[ctx.params.snapshot];

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, propsAst };
}

async function putSnapshot(ctx) {
  const body = ctx.request.body;

  const customTypes = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  );

  const snapshotName = ctx.params.snapshot;
  const currentSnapshot =
    customTypes[ctx.params.component][ctx.params.snapshot];
  const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);

  const newSnapshotWithKey = { [snapshotName]: newSnapshot };

  const newComponent = {
    [ctx.params.component]: Object.assign(
      {},
      customTypes[ctx.params.component],
      newSnapshotWithKey
    )
  };

  const newCustomTypes = Object.assign({}, customTypes, newComponent);

  console.log("newCustomTypes ", newCustomTypes);

  ctx.body = {};

  fs.writeFileSync(
    "./flow/custom_types.js",
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Now repeat steps in getComponentData
  // TODO: Put this into single helper function

  // 1
  const propsAsts = fs.readFileSync("./flow/flow_asts.js", "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  )[ctx.params.component];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[ctx.params.snapshot];

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, propsAst };
}

async function delSnapshot(ctx) {
  const customTypes = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
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
    "./flow/custom_types.js",
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Repeat steps from getComponentData

  // 1
  const propsAsts = fs.readFileSync("./flow/flow_asts.js", "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(
    fs.readFileSync("./flow/custom_types.js", "utf8")
  )[ctx.params.component];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots["default"];

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

if (!module.parent) app.listen(3000);
