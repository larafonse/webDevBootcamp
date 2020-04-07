var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
 
// allows us to render ejs file wwithout having to put .ejs at the end
app.set("view engine","ejs");

// SCHEMA TEMPLATE
var campSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String
});

var camp = mongoose.model("Camp",campSchema);

// camp.create({
//     name:"Patriot Park", 
//     img:"https://media-cdn.tripadvisor.com/media/photo-m/1280/17/62/b2/c1/pinnacles-national-park.jpg",
//     description:"This is a very patriotic park. Also contains a skate park"
// },function(err,camp){
//         if(err){
//             console.log(err);
//             }else{
//                 console.log(`${camp.name} SUCCESSFULLY ADDED TO DATABASE`);
//             }
//     });

// home route
app.get("/",function(req,res){
    res.render("home");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    // Get campgrounds from database
    camp.find({},function(err,camps){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{camps:camps});
        }
    });  
});
// CREATE - create new campground
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgorunds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name,img:image,description:desc}
    
    camp.create(newCampground,function(err,camp){
        if(err){
            console.log(err);
            }else{
                console.log(`${camp.name} SUCCESSFULLY ADDED TO DATABASE`);
            }
    });
    
    // redirect back to campgroundsroute
    res.redirect("/campgrounds");

});
// NEW - Schow form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});
// 
app.get("/campgrounds/:id", function(req,res){
    camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("show", {camp :foundCamp});
        }
    });
});

app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });
