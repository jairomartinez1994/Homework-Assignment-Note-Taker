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
    var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log("new data enter",newNote);
    var newNote = req.body;
    
    var uniqueId = (noteData.length).toString();
    
    newNote.id = uniqueId;
    console.log("new data enter", newNote);
    

    noteData.push(newNote);
    console.log("inside the array",noteData);
    
    fs.writeFile("./db/db.json", JSON.stringify(noteData));
    res.sendFile(path.join(__dirname, "./db/db.json"))
    });

    
    

    server.delete("/api/notes/:id", function (req, res) {
        console.log("Called")
    
        var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        var choosen = req.params.id;
        console.log(choosen)
    
        var newId = 0;
        if (noteData.length > 0) {
            noteData = noteData.filter(currentNote => {
                return currentNote.id != choosen;
            });
            for (currentNote of noteData) {
                currentNote.id = newId.toString();
                newId++;
            }
            fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
            res.sendFile(path.join(__dirname, "./db/db.json"));
        }else return;
        
    });

    server.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
    });
    

server.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
})
