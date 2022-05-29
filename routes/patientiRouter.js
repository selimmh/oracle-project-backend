var express = require('express');
const oracledb = require("oracledb");
var router = express.Router();
const PatientController = require("../controllers/pacientController");
const dbConfig = require("../db/config");


router.get("/get", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let patientii = await PatientController.GetPatientii(connection);
    connection.close();
    res.send(patientii);
  });


  router.post("/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.AddPatient(connection, req.body);
    connection.close();
    res.send(response);
  });

  router.put("/update", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.UpdateMailulPacientului(connection,req.body);
    connection.close();
    res.send(response);
  })


  router.delete("/delete", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await PatientController.DeletePatient(connection,req.body.userId);
    connection.close();
    res.send(response);
  })

  module.exports = router;