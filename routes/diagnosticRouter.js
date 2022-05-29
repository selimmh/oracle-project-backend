var express = require('express');
const oracledb = require("oracledb");
var router = express.Router();
const DiagnosticController = require("../controllers/diagnosticController");
const dbConfig = require("../db/config");

router.get('/get', async function (req, res) {
    let connection = await oracledb.getConnection(dbConfig);
    let medici = await DiagnosticController.GetDiagnostic(connection);
    connection.close();
    res.send(medici);
  })

  router.post("/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await DiagnosticController.AddDiagnostic(connection, req.body);
    connection.close();
    res.send(response);
  });



module.exports = router;