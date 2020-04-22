var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStratgy   = require("passport-local"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    camp           = require("./models/camp");
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment"), 
    User           = require("./models/user")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")

mongoose.connect('mongodb://localhost:27017/yelp_campv2', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// ===== PASSPORT CONFIG =====
app.use(require("express-session")({
    secret:"YelpCamp",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });
