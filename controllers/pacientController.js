const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetPatientii(connection) {
  sql = `SELECT * FROM pacient`;
  binds = {};

  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  let result
  try{
      result = await connection.execute(sql, binds, options);
      return result.rows;
  } catch(e){
      console.log(e);
      return e
  }
  
}

async function AddPatient(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      `INSERT INTO pacient VALUES (:1, :2, :3, :4, :5, :6, :7, :8)`,
      {
        1: uuidv4(),
        2: data.prenume,
        3: data.nume,
        4: data.gen,
        5: data.ani,
        6: data.adresa,
        7: data.email,
        8: data.tel,
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

async function UpdateMailulPacientului(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      "UPDATE pacient set email=:email  WHERE id_pacient=:id ",
      { email: data.email, id: data.userId },
      { autoCommit: true }
    );
    console.log("Rows updated: " + result.rowsAffected);
    resData = {
      status: 200,
      msg: "Number of rows updated: " + result.rowsAffected,
    };

    console.log("Number of rows updated: " + result.rowsAffected);
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

async function DeletePatient(connection, userId) {
    let resData;
    try {
      result = await connection.execute(
        "DELETE FROM pacient WHERE id_pacient=:id ",
        { id: userId },
        { autoCommit: true }
      );
      console.log("Rows deleted: " + result.rowsAffected);
      resData = {
        status: 200,
        msg: "Number of rows deleted: " + result.rowsAffected,
      };
  
      console.log("Number of rows deleted: " + result.rowsAffected);
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

exports.GetPatientii = GetPatientii;
exports.AddPatient = AddPatient;
exports.UpdateMailulPacientului = UpdateMailulPacientului;
exports.DeletePatient = DeletePatient;
