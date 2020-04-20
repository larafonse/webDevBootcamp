var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware")

var camp    = require("../models/camp")

// SHOW CAMPGROUNDS
router.get("/", function(req,res){
    // Get campgrounds from database
    camp.find({},function(err,camps){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/campgrounds",{camps:camps, currentUser : req.user});
        }
    });  
});

// CREATE NEW CAMPGROUND
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgorunds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var auth = {
        id:req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name,img:image,description:desc, author:auth} 
    
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
// NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});
// SHOW CAMPGROUND 
router.get("/:id", function(req,res){
    camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {camp :foundCamp});
        }
    });
});

// EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    camp.findById(req.params.id,function(err, foundCamp){
        res.render("campgrounds/edit", {camp :foundCamp}); 
    }); 
});
// UPDATE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    // find and update campground
    camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err,updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
// DESTROY CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    camp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds');
        }
    });
});
 module.exports = router; 