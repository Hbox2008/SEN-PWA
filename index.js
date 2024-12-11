// This script reads the database and outputs the information to a json file, as well as
// hosting the pages on port 8000

console.log("node".split("").sort().join(""));
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/data_source.db");

// Grabs the information from data_source.db and prints it into frontEndData.json

let myString = "[\n";
db.all("SELECT * FROM crops", function (err, rows) {
  let myCounter = 0;
  rows.forEach(function (row) {
    myString =
      myString +
      '{\n"ID":' +
      row.ID +
      ',\n"crop":"' +
      row.crop +
      '"' +
      ',\n"growTime":' +
      row.growTime +
      ',\n"profDaily":' +
      row.profDaily +
      ',\n"regrow":"' +
      row.regrow +
      '"' +
      ',\n"seedPrice":"' +
      row.seedPrice +
      '",\n"image":"' +
      row.image +
      '",\n"link":"' +
      row.link +
      '",\n"season":"' +
      row.season;
    myCounter++;
    if (myCounter == rows.length) {
      myString = myString + '"\n}\n';
    } else {
      myString = myString + '"\n},\n';
    }
  });

  var fs = require("fs");
  fs.writeFile("public/frontEndData.json", myString + "]", function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// Hosts the pages on port 8000

const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
let bodyParser = require("body-parser");
const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  res.sendFile(path.join(__dirname, "public/fields.html"));
  res.sendFile(path.join(__dirname, "public/about.html"));
});

app.listen(8000, () =>
  console.log(
    "Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:80 to access your website"
  )
);
