const oracledb = require("oracledb");
const { v4: uuidv4 } = require("uuid");

async function GetMedici(connection) {
  sql = `SELECT * FROM medic`;
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

async function AddMedic(connection, data) {
  let resData;
  try {
    result = await connection.execute(
      `INSERT INTO medic VALUES (:1, :2, :3, :4, :5, :6)`,
      {
        1: uuidv4(),
        2: data.nrTel,
        3: data.nume,
        4: data.spec,
        5: data.gen,
        6: data.email,
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

async function UpdateMailulMedicului(connection, data) {
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

async function DeleteMedic(connection, userId) {
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

exports.GetMedici = GetMedici;
exports.AddMedic = AddMedic;
exports.UpdateMailulMedicului = UpdateMailulMedicului;
exports.DeleteMedic = DeleteMedic;
