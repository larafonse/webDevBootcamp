var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    camp       = require("./models/camp");
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment")


mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


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
            res.render("campgrounds/campgrounds",{camps:camps});
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
    res.render("campgrounds/new");
});
// SHOW Camp
app.get("/campgrounds/:id", function(req,res){
    camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {camp :foundCamp});
        }
    });
});
// ==========================
//      COMMENT ROUTES
// ==========================
app.get("/campgrounds/:id/comments/new", function(req,res){
    // find campground by id
    camp.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {camp:camp});
        }
    })
});
app.post("/campgrounds/:id/comments",function(req,res){

    camp.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/"+camp._id)
                }
            });
        }
    });
    // look up campground using id
    // add comment to post 
    //redirect to campground page
})

app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });
