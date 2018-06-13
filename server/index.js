const fs = require("fs");
const Koa = require("koa");
const router = require("koa-router")();
const koaBody = require("koa-body");
const cors = require("@koa/cors");
// const logger = require('koa-logger');
const createFakeProps = require("./createFakeProps");
const {
  getComponentData,
  postSnapshot,
  putSnapshot,
  delSnapshot
} = require("./routes");

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

if (!module.parent) app.listen(3001);
