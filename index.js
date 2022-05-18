const oracledb = require("oracledb");
process.env.ORA_SDTZ = "UTC";
const app = require("./app/express.js");
const mediciRouter = require("./routes/mediciRouter");
const programariRouter = require("./routes/programariRouter");
const patientRouter = require("./routes/patientiRouter");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


async function run() {
 
  if (process.platform === "darwin") {
    try {
      oracledb.initOracleClient({
        libDir: "/Users/pyagmyrov/downloads/instantclient_19_8",
      });
    } catch (err) {
      console.error("Whoops!");
      console.error(err);
      process.exit(1);
    }
  }

  console.log("hellooo")

  app.use("/medici",mediciRouter);
  app.use("/patienti", patientRouter);
  app.use("/programari", programariRouter);


}

run();
