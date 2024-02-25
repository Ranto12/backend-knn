const connection = require("../config/db");

const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getLastInsertedId = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT LAST_INSERT_ID() AS lastId";
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const lastId = result[0].lastId;
        resolve(lastId);
      }
    });
  });
};

module.exports = {getLastInsertedId, executeQuery};