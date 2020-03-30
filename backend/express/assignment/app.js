var express = require("express");
var app = express();

var animal={
    pig:"oink",
    cow:"moo",
    dog:"woof"
};
// Home Route
app.get("/",function(req,res){
    res.send("Hi there, Welcome to my assignment!");
});

app.get("/speak/:animalName",function(req,res){
    var name=req.params.animalName;
    var noise=animal[name];
    res.send("The "+name+" says "+noise+"!");
});
app.get("/repeat/:word/:num",function(req,res){
    var final = ""
    for(var i= 0; i< parseInt(req.params.num);i++){
        final+=(req.params.word+" ");
    }
    res.send(final);
});
// Catches all other routes
app.get("*",function(req,res){
    res.send("Sorry, page not found . . . What are you doing with your life?");
});




// Tell express to listen in port 3000
app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });

// In cloud9 it becomes app.listen(process.env.PORT, process.env.IP, function(){})