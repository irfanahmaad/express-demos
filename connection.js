const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  let message = !err ? "connected" : "connected failed";
  console.log(`mysql : ${message}`);
});

module.exports = connection;
