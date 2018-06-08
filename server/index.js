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

const filepaths = {
  propsAsts: "./server/flow/flow_asts.js",
  customTypes: "./server/flow/custom_types.js"
};

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

  const snapshot = snapshots[selectedSnapshot];

  // 3: Generate fake data (fake props)
  const fakeProps = createFakeProps(propsAst, snapshot);

  // 4: send it all back
  ctx.body = { fakeProps, snapshot, snapshotNames, propsAst };
}

async function postSnapshot(ctx) {
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

  fs.writeFileSync(
    filepaths.customTypes,
    JSON.stringify(newCustomTypes),
    "utf8"
  );

  // Now repeat steps in getComponentData
  // TODO: Put this into single helper function

  // 1
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

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
    fs.readFileSync(filepaths.customTypes, "utf8")
  );

  const snapshotName = body.name;
  const currentSnapshot =
    customTypes[ctx.params.component][ctx.params.snapshot];
  const newSnapshot = Object.assign({}, currentSnapshot, body.snapshotChanges);

  const newSnapshotWithKey = { [snapshotName]: newSnapshot };

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
  const propsAsts = fs.readFileSync(filepaths.propsAsts, "utf8");
  const propsAst = JSON.parse(propsAsts)[ctx.params.component];

  // 2
  const snapshots = JSON.parse(fs.readFileSync(filepaths.customTypes, "utf8"))[
    ctx.params.component
  ];

  const snapshotNames = Object.keys(snapshots);

  const snapshot = snapshots[snapshotName];

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

async function delSnapshot(ctx) {
  console.log("ctx ", ctx);
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

if (!module.parent) app.listen(3001);
