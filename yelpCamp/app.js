var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
// allows us to render ejs file wwithout having to put .ejs at the end
app.set("view engine","ejs");

var camps = [
    {name:"Oak Park", img:"https://cdn.greenfieldnews.com/wp-content/uploads/sites/13/2019/10/1b4f02f05b4fb79d2ad6a0826e37884f.jpg"},
    {name:"Pinnacles", img:"https://media-cdn.tripadvisor.com/media/photo-m/1280/17/62/b2/c1/pinnacles-national-park.jpg"},
    {name:"San Lorenzo Park", img:"https://www.kingcity.com/wp-content/uploads/2015/04/san-lorenzo-park-2.png"}
]
// home route
app.get("/",function(req,res){
    res.render("home");
});
// campground route
app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds",{camps:camps});
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgorunds array
    var name = req.body.name;
    var image = req.body.image;
    console.log(image)
    var newCampground = {name:name,img:image}
    camps.push(newCampground)
    // redirect back to campgroundsroute
    res.redirect("/campgrounds");

});

app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });
