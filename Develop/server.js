var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

var PORT = 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
  
app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", function(err,data){
        if (err) throw err;
        console.log(data);
        return res.json(JSON.parse(data));
    });
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

app.post("/api/notes", function(req, res){
    fs.readFile("db/db.json", function(err,data){
        if (err) throw err;
        let json = JSON.parse(data);
        const newNote = {
        id: json.length + 1,
        title: req.body.title,
        text: req.body.text,
    };
    json.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(json),
        function (err,data) {
            if (err) throw err;
            // learn to solve using fs write file
            res.redirect("/notes");
        });
    });
}); 

app.delete("/api/notes/:id", function(req, res){
    fs.readFile("db/db.json", function(err,data){
        if (err) throw err;
        console.log(req.params.id);
        let json = JSON.parse(data);
        const note = json.filter(note => note.id != req.params.id)
        fs.writeFile("db/db.json", JSON.stringify(note), function(err,data){
            if (err) throw err;
            // learn to solve using fs write file
            res.end(data);
        });
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});