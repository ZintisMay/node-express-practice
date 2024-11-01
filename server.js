const express = require("express");
const fs = require("fs");

const app = express();

const FILE_NAME = "array.txt";
const array = loadFile() || [];

app.get("/", function (req, res) {
  res.send("THIS IS MY SERVER");
});

app.get("/index", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/info/:word", function (req, res) {
  let word = req.params.word;
  console.log(word);
  array.push(word);
  res.json(array);
  saveFile(array);
});

app.get("/info", function (req, res) {
  res.json(array);
});

app.listen(3333, function () {
  console.log("app is listening on 3333");
});

function saveFile(data) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(data));
}

function loadFile(name) {
  let data = fs.readFileSync(FILE_NAME);
  return JSON.parse(data.toString());
}
