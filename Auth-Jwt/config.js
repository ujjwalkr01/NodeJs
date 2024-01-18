const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alliswell@5643",
  database: "nodejs_login",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = db;
