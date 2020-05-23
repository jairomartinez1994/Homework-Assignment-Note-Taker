var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 8080;

let notesData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop")));

app.get("/api/notes", function (err, res) {
  try {
    notesData = fs.readFileSync("Develop/db/db.json");

    notesData = JSON.parse(notesData);

  } catch (err) {
    console.log(err);
  }
  res.json(notesData);
});


app.post("/api/notes", function (req, res) {
  try {
    notesData = fs.readFileSync("./Develop/db/db.json");

    notesData = JSON.parse(notesData);
    req.body.id = notesData.length;
    notesData.push(req.body);
    notesData = JSON.stringify(notesData);

    fs.writeFile("./Develop/db/db.json", notesData, function (err) {
      if (err) throw err;
    });
    res.json(JSON.parse(notesData));

  } catch (err) {
    throw err;
  }
});


app.delete("/api/notes/:id", function (req, res) {
  try {
    notesData = fs.readFileSync("./Develop/db/db.json");
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(function (note) {
      return note.id != req.params.id;
    });
    notesData = JSON.stringify(notesData);

    fs.writeFile("./Develop/db/db.json", notesData, function (err) {
      if (err) throw err;
    });

    res.send(JSON.parse(notesData));

  } catch (err) {
    throw err;
  }
});


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "./db/db.json"));
});


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
