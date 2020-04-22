var express = require("express"),
    router  = express.Router({mergeParams:true}),
    middleware = require("../middleware")

var camp    = require("../models/camp"),
    Comment    = require("../models/comment")

// NEW COMMENT
router.get("/new",middleware.isLoggedIn, function(req,res){
    // find campground by id
    camp.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {camp:camp});
        }
    })
});

// NEW COMMENT CREATE
router.post("/",middleware.isLoggedIn, function(req,res){

    camp.findById(req.params.id, function(err,camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    // save comment
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success","Succesfully added comment");
                    res.redirect("/campgrounds/"+camp._id)
                }
            });
        }
    });
});

// COMMENT EDIT ROUTES
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{camp_id : req.params.id,comment:foundComment});
        }
    })
});

// COMMENT UPDATE
router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    }); 
});

// COMMENT DESTROY
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Succesfully deleted comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// MIDDLEWARE


module.exports = router; 
