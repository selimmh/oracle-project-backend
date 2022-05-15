const oracledb = require("oracledb");
process.env.ORA_SDTZ = "UTC";
const PatientController = require("./controllers/patientController.js");
const dbConfig = require("./db/config.js");
const app = require("./app/express.js");
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

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log("db connected");
  } catch (err) {
    console.error(err);
  }

  app.get("/patienti/get", async (req, res) => {
    let patientii = await PatientController.GetPatientii(connection);
    res.send(patientii);
  });

  app.post("/patienti/add", async (req, res) => {
    let response = await PatientController.AddPatient(connection, req.body);

    res.send(response);

  });

  app.put("/patienti/update", async(req,res)=>{
    let response = await PatientController.UpdateMailulPacientului(connection,req.body);
    res.send(response);
  })

  app.delete("/patienti/delete", async(req,res)=>{
    let response = await PatientController.DeletePatient(connection,req.body.userId);
    res.send(response);
  })

}

run();
