var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User                  = require('./models/user')

mongoose.connect('mongodb://localhost:27017/auth_demo', {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('express-session')({
    secret:'Top Tier Coder Nicolas',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ========== ROUTES ==========

app.get('/',function(req,res){
    res.render('home');
});

app.get('/secret',isLoggedIn, function(req,res){
    res.render('secret');
});

// -------- Register Routes --------

app.get('/register',function(req,res){
    res.render('register');
});

app.post('/register', function(req,res){
    User.register(new User({username:req.body.username}), req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/secret');
        });
    });
     
});

// -------- Login Routes --------
app.get('/login',function(req,res){
    res.render('login');
});

app.post('/login', passport.authenticate('local',{
    successRedirect:'/secret',
    failureRedirect:'/login'
}), function(req,res){
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
// ========== LISTENER ==========

app.listen(3000,function() { 
    console.log('Server listening on port 3000'); 
  });