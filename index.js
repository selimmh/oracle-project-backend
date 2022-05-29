const oracledb = require("oracledb");
process.env.ORA_SDTZ = "UTC";
const app = require("./app/express.js");
const mediciRouter = require("./routes/mediciRouter");
const programariRouter = require("./routes/programariRouter");
const diagnosticRouter = require("./routes/diagnosticRouter");
const tratamentRouter = require("./routes/tratamentRouter");
const patientRouter = require("./routes/patientiRouter");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function run() {
  console.log("hellooo");
  app.use("/doctor", mediciRouter);
  app.use("/pacient", patientRouter);
  app.use("/programare", programariRouter);
  app.use("/diagnostic", diagnosticRouter);
  app.use("/tratament", tratamentRouter);
}

run();
