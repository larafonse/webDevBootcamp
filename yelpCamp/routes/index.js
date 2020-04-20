var express = require("express"),
    router  = express.Router()
    passport = require("passport")

var User    = require("../models/user")

// LANDING PAGE
router.get("/",function(req,res){
    res.render("home");
});



// REGISTER FORM
router.get("/register", function(req,res){
    res.render("register");
});

// CREATE NEW USER
router.post("/register", function(req,res){
    var newUser = new User({username:req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN FORM
router.get('/login',function(req,res){
    res.render('login');
});
// LOGIN LOGIC
router.post('/login', passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
    }), function(req,res){
});

// LOG OUT
router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/campgrounds');
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router; 