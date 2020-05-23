var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('public'))

var noteData = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});
app.get("/api/notes", function (req, res) {
    
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

app.get("/api/notes/:id", function (req, res) {
    var chosen = req.params;
    var myid=choosen.id
    
    console.log("choose",myid);
   
     for(var i=0; i<noteData.length;i++){
        if(choosen===noteData[i].title){
           return res.json(noteData[i]);
}
    }
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log("new data enter",newNote);
    var newNote = req.body;
    
    var uniqueId = (noteData.length).toString();
    
    newNote.id = uniqueId;
    console.log("new data enter", newNote);
    

    noteData.push(newNote);
    console.log("pushing a new note",noteData);
    
    fs.writeFile("./db/db.json", JSON.stringify(noteData));
    res.sendFile(path.join(__dirname, "./db/db.json"))
    });

    app.delete("/api/notes/:id", function (req, res) {
        console.log("DELETE")
    
        var noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        var choosen = req.params.id;
        console.log("Choose wisely")
    
        var newId = 0;
        if (noteData.length > 0) {
            noteData = noteData.filter(currentNote => {
                return currentNote.id != chosen;
            });
            for (currentNote of noteData) {
                currentNote.id = newId.toString();
                newId++;
            }
            fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
            res.sendFile(path.join(__dirname, "./db/db.json"));
        }else return;
        
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"))
    });
    
app.listen(PORT, function () {
    console.log("NoteTaker is listening to" + PORT);
})
