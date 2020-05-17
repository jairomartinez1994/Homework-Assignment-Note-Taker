var express = require("express");
var path = require("path");
var fs = require("fs");


var server = express();
var PORT = 8080;
server.use(express.static('public'))

var noteData = [];






server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
});
server.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
});
server.get("/api/notes", function (req, res) {
    
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

server.get("/api/notes/:id", function (req, res) {
    var choosen = req.params;
    var myid=choosen.id
    
    console.log("choosen....",myid);
   
     for(var i=0; i<noteData.length;i++){
        if(choosen===noteData[i].title){
           return res.json(noteData[i]);
        }
     }
});


server.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log("new data enter",newNote);

    
    noteData.push(newNote);
    console.log("inside the array",noteData);
    
    fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
        if (err) {
            throw err;
        }
    });
    
    res.sendFile(path.join(__dirname, "./db/db.json"))

});



server.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
})