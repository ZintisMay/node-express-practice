const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const FILE_NAME = "array.txt";
const MESSAGES_FILE_NAME = "messages.txt";
const array = loadFile(FILE_NAME) || [];
const messages = loadFile(MESSAGES_FILE_NAME) || [];

function addMessage(user, text) {
  let m = {
    user,
    text,
  };
  messages.push(m);
  saveFile(MESSAGES_FILE_NAME, messages);
}

app.get("/", function (req, res) {
  res.send("THIS IS MY SERVER");
});

app.get("/index", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (req, res) {
  res.json(messages);
});

app.post("/messages", function (req, res) {
  console.log("req.body", req.body);
  addMessage(req.body.user, req.body.text);
  res.json(messages);
});

app.get("/info/:word", function (req, res) {
  let word = req.params.word;
  console.log(word);
  array.push(word);
  res.json(array);
  saveFile(FILE_NAME, array);
});

app.get("/info", function (req, res) {
  res.json(array);
});

app.listen(3333, function () {
  console.log("app is listening on 3333");
});

function saveFile(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data));
}

function loadFile(fileName) {
  let data = fs.readFileSync(fileName);
  return JSON.parse(data.toString());
}
