var express = require('express');
const oracledb = require("oracledb");
var router = express.Router();
const TratamentController = require("../controllers/tratamentController");
const dbConfig = require("../db/config");

router.get('/get', async function (req, res) {
    let connection = await oracledb.getConnection(dbConfig);
    let medici = await TratamentController.GetTratament(connection);
    connection.close();
    res.send(medici);
  })

  router.post("/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await TratamentController.AddTratament(connection, req.body);
    connection.close();
    res.send(response);
  });



module.exports = router;