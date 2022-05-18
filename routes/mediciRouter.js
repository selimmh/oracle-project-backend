var express = require('express');
const oracledb = require("oracledb");
var router = express.Router();
const MedicController = require("../controllers/medicController");
const dbConfig = require("../db/config");

router.get('/get', async function (req, res) {
    let connection = await oracledb.getConnection(dbConfig);
    let medici = await MedicController.GetMedici(connection);
    connection.close();
    res.send(medici);
  })

  router.post("/add", async (req, res) => {
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.AddMedic(connection, req.body);
    connection.close();
    res.send(response);
  });

  router.put("/update", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.UpdateMailulMedicului(connection,req.body);
    connection.close();
    res.send(response);
  })

  router.delete("/delete", async(req,res)=>{
    let connection = await oracledb.getConnection(dbConfig);
    let response = await MedicController.DeleteMedic(connection, req.body.userId);
    connection.close();
    res.send(response);
  })

module.exports = router;