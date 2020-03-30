var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs")
var majors= [
    {title :"Animal Science", name:"Gael"},
    {title :"Biology", name:"Nilza"},
    {title :"Computer Science", name:"Nick"}
];

// Root
app.get("/", function(req,res){
    res.render("home");
});
// if statement exercise
app.get("/fellinlove/:thing", function(req,res){
    var thing = req.params.thing;
    // res.send("You fell in love with "+ thing);
    res.render("love",{thingVar:thing});
});
// for loop exercise
app.get("/majors", function(req,res){
    // res.send("You fell in love with "+ thing);
    res.render("majors", {majors:majors});
});
// post route
app.post("/addmajor", function(req,res){
    // retrieves informartion from form and add to majors array
    var newMajor = req.body;
    majors.push(newMajor);
    // redirect to majors route
    res.redirect("/majors");

});
// Catches all other routes
app.get("*",function(req,res){
    res.send("Sorry, page not found . . . What are you doing with your life?");
});

// Port Listener
app.listen(3000, function(){
    console.log("Application Running on Port 3000");
});