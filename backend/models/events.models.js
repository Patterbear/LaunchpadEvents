const db = require("../db/connection");
const format = require("pg-format");

exports.selectEvents = () => {
  return db.query(`SELECT * FROM events;`).then((result) => {
    return [result.rows];
  });
};
