const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetProgramari(connection) {
  sql = `SELECT * FROM programari`;
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

async function AddProgramari(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      `INSERT INTO programari VALUES (:1, :2, TO_DATE(:3, 'YYYY-MM-DD'), :4, :5, :6)`,
      {
        1: uuidv4(),
        2: data.caz,
        3: data.time,
        4: data.duration,
        5: data.patientId,
        6: data.medicId,
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

async function UpdateDataProgramari(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      "UPDATE medic set email=:email  WHERE id=:id ",
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

async function DeleteProgramari(connection, userId) {
  let resData;
  try {
    result = await connection.execute(
      "DELETE FROM medic WHERE id=:id ",
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

exports.GetProgramari = GetProgramari;
exports.AddProgramari = AddProgramari;
exports.UpdateDataProgramari = UpdateDataProgramari;
exports.DeleteProgramari = DeleteProgramari;
