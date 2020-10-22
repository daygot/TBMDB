const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const dbName = "./db/Cars.sqlite3";

console.log("Connecting to the database on ", dbName);
const db = new sqlite3.Database(dbName);

console.log("Reading script");

const query = fs.readFileSync("Cars.sqlite3.sql", "utf8");

console.log("Executing query");
db.exec(query, (err) => {
  if (err) throw err;

  console.log("Done!");
  db.close();
});
