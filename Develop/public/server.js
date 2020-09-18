var express = require("express");
var path = require("path");

var app = express();

var PORT = 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});
  
app.get("/api/notes", function(req, res) {
    return res.json(activeNote);
});
  
app.post("api/notes", function(req, res){
    var newNote = req.body;
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    activeNote.push(newNote);
    res.json(newNote);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});