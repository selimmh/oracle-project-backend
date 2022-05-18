var express = require('express');
const oracledb = require("oracledb");
var router = express.Router();
const ProgramariControlller = require("../controllers/programariController");
const dbConfig = require("../db/config");


router.get("/get", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let patientii = await ProgramariControlller.GetProgramari(connection);
    connection.close();
    res.send(patientii);
  });

  router.post("/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.AddProgramari(connection, req.body);
    connection.close();
    res.send(response);
  });
  

  router.put("/update", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.UpdateDataProgramari(connection, req.body);
    connection.close();
    res.send(response);
  });

  router.delete("/delete", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await ProgramariControlller.DeleteProgramari(connection, req.body.programariId);
    connection.close();
    res.send(response);
  });


module.exports = router;