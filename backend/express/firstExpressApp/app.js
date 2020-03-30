var express = require("express");
var app = express();

// Home Route
app.get("/",function(req,res){
    res.send("hello world");
});
// Bye route
app.get("/bye",function(req,res){
    res.send("Good Bye World");
});
// Dog route
app.get("/dog",function(req,res){
    res.send("its a cat world");
});
// Route parameter/path variables
app.get("/r/:subRedditName",function(req,res){
    var path =req.params.subRedditName;
    res.send('you are on the '+path+' subreddit');
});

// Catches all other routes
app.get("*",function(req,res){

    res.send("You are a star");
});
// Tell express to listen in port 3000
app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });

// In cloud9 it becomes app.listen(process.env.PORT, process.env.IP, function(){})