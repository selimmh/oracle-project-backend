const oracledb = require("oracledb");
process.env.ORA_SDTZ = "UTC";
const PatientController = require("./controllers/patientController.js");
const MedicController = require("./controllers/medicController.js");
const ProgramariControlller = require("./controllers/programariController.js");
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

  console.log("hellooo")

  app.get("/patienti/get", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let patientii = await PatientController.GetPatientii(connection);
    connection.close();
    res.send(patientii);
  });

  app.post("/patienti/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.AddPatient(connection, req.body);
    connection.close();
    res.send(response);
  });

  app.put("/patienti/update", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.UpdateMailulPacientului(connection,req.body);
    connection.close();
    res.send(response);
  })

  app.delete("/patienti/delete", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.DeletePatient(connection,req.body.userId);
    connection.close();
    res.send(response);
  })

  app.get("/medici/get", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let medici = await MedicController.GetMedici(connection);
    connection.close();
    res.send(medici);
  });

  app.post("/medici/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.AddMedic(connection, req.body);
    connection.close();
    res.send(response);
  });

  app.put("/medici/update", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.UpdateMailulMedicului(connection,req.body);
    connection.close();
    res.send(response);
  })

  app.delete("/medici/delete", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.DeleteMedic(connection, req.body.userId);
    connection.close();
    res.send(response);
  })

  app.get("/programari/get", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let patientii = await ProgramariControlller.GetProgramari(connection);
    connection.close();
    res.send(patientii);
  });

  app.post("/programari/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.AddProgramari(connection, req.body);
    connection.close();
    res.send(response);
  });
 
  app.put("/programari/update", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.UpdateDataProgramari(connection, req.body);
    connection.close();
    res.send(response);
  });

  app.delete("/programari/delete", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.DeleteProgramari(connection, req.body.programariId);
    connection.close();
    res.send(response);
  });

}

run();
