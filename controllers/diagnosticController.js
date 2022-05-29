const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetDiagnostic(connection) {
  sql = `SELECT * FROM diagnostic`;
  binds = {};

  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  let result;
  try {
    result = await connection.execute(sql, binds, options);
    return result.rows;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function AddDiagnostic(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      `INSERT INTO diagnostic VALUES (:1, :2)`,
      {
        1: uuidv4(),
        2: data.diagnostic,   
      },
      { autoCommit: true }
    );
    console.log("Rows inserted: " + result.rowsAffected);
    resData = {
      status: 200,
      msg: "Number of rows inserted: " + result.rowsAffected,
    };

    console.log("Number of rows inserted: " + result.rowsAffected);
    return resData;
  } catch (e) {
    resData = {
      status: 401,
      msg: e,
    };

    console.log(e);
    return resData;
  }
}



exports.GetDiagnostic = GetDiagnostic;
exports.AddDiagnostic = AddDiagnostic;
