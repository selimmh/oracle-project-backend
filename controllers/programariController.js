const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetProgramari(connection) {
  sql = `SELECT * FROM programare`;
  binds = {};
  options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  let programare;
  try {
    programare = await connection.execute(sql, binds, options);

    let returnArray = [];
    for (let i = 0; i < programare.rows.length; i++) {
      sql2 = `SELECT * FROM pacient where id_pacient = :id`;
      binds2 = { id: programare.rows[i].ID_PACIENT };
      options2 = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      };
      let pacient;
      try {
        pacient = await connection.execute(sql2, binds2, options2);
      } catch (e) {
        console.log(e);
        return e;
      }
      sql3 = `SELECT * FROM doctor where id_doctor = :id`;
      binds3 = { id: programare.rows[i].ID_DOCTOR };
      options3 = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      };
      let doctor;
      try {
        doctor = await connection.execute(sql3, binds3, options3);
      } catch (e) {
        console.log(e);
        return e;
      }
      let returnData = {
        ID_PACIENT: programare.rows[i].ID_PACIENT,
        ID_DOCTOR: programare.rows[i].ID_DOCTOR,
        ID_PROGRAMARE: programare.rows[i].ID_PROGRAMARE,
        TRATAMENT: programare.rows[i].TRATAMENT,
        MEDICAMENT: programare.rows[i].MEDICAMENT,
        DATA_PROGRAMARE: programare.rows[i].DATA_PROGRAMARE,
        pacient: pacient.rows[0],
        doctor: doctor.rows[0],
      };
      returnArray.push(returnData);
    }

    return returnArray;
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
        5: data.tratament,
        6: data.medicament,
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
      "UPDATE programare set DATA_PROGRAMARE = TO_TIMESTAMP(:time, 'YYYY-MM-DD HH24:MI') WHERE id_programare=:id ",
      { time: data.time, id: data.programariId },
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
