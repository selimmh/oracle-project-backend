const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetProgramari(connection) {
  sql = `SELECT * FROM programare`;
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
      `INSERT INTO programare VALUES (:1, TO_TIMESTAMP(:2, 'YYYY-MM-DD HH24:MI'), :3, :4, :5, :6)`,
      {
        1: uuidv4(),
        2: data.time,
        3: data.idPacient,
        4: data.idDoctor,
        5: data.idDiagnostic,
        6: data.idTratament,
      
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
      "UPDATE programare set id_diagnostic=:idDiagnostic, id_tratament=:idTratament WHERE id_programare=:id ",
      { idDiagnostic: data.idDiagnostic, idTratament: data.idTratament, id: data.programariId },
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

async function DeleteProgramari(connection, programariId) {
  let resData;
  try {
    result = await connection.execute(
      "DELETE FROM programare WHERE id_programare=:id ",
      { id: programariId },
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
