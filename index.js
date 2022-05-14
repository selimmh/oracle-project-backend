const oracledb = require('oracledb');
const express =  require("express");
process.env.ORA_SDTZ = 'UTC';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "OraPasswd1"  // set mypw to the hr schema password
const port = process.env.PORT || 8080;

async function run() {
  let app = express();

  app.get("/",(req,res)=>{
    res.send("heeye")
  })
  app.listen(port);
  
//   try {
//     oracledb.initOracleClient({libDir: '/Users/pyagmyrov/Downloads/instantclient_19_8'});
//   } catch (err) {
//     console.error('Whoops!');
//     console.error(err);
//     process.exit(1);
//   }
  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "system",
      password      : mypw,
      connectString : "db.dintie.yagmyrov.me:1521/oratest1"
    });

    
    
    // Insert two rows
    //
    // { name: 'ID' },
    // { name: 'NUME' },
    // { name: 'NR_TEL' },
    // { name: 'DATA_NASTERE' },
    // { name: 'CAZ' }

    // sql = `INSERT INTO patient VALUES (:1,:2,:3, CURRENT_DATE,:4)`;

    // binds = [
    //   ["f8515134-bff6-45dd-96b5-60e46642bebd", "Perman Yagnyrov", "40757867929","Problema dinti"],
    //   ["efb0f926-421f-48ee-a7fd-96bcb0ecc3a6", "Alex Bogdan", "40754627321", "Ortodent" ],
    // ];

    // // For a complete list of options see the documentation.
    // options = {
    //   autoCommit: true,
    //   // batchErrors: true,  // continue processing even if there are data errors
    //   bindDefs: [
    //     { type: oracledb.STRING, maxSize:50 },
    //     { type: oracledb.STRING, maxSize: 50 },
    //     { type: oracledb.STRING, maxSize: 50 },
    //     { type: oracledb.STRING, maxSize: 50 }
    //   ]
    // };

    // try{
    //   result = await connection.executeMany(sql, binds, options);
    //   console.log("Number of rows inserted:", result.rowsAffected);
    // }catch(e){
    //   console.log(e);
    // }
    

  



    sql = `SELECT * FROM patient`;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
      // extendedMetaData: true,               // get extra metadata
      // prefetchRows:     100,                // internal buffer allocation size for tuning
      // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };

    
    result = await connection.execute(sql, binds, options);

    console.log("Metadata: ");
    console.dir(result.metaData, { depth: null });
    console.log("Query results: ");
    console.dir(result.rows, { depth: null });

  console.log("db connected")

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();