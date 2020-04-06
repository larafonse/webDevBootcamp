const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', {useNewUrlParser: true, useUnifiedTopology: true});

// TEMPLATE
var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temperaent:String
});

var Cat = mongoose.model("Cat",catSchema);
// CREATE

// Option 1
// var prince = new Cat({
//     name:"Stella",
//     age:4,
//     temperaent:"Playful"
// });

// prince.save().then(() => console.log('meow'));

// Option 2
// Cat.create({
//     name:"Belgi",
//     age:3,
//     temperaent:"Grouchy"
// }, function(err,cat){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(`${cat.name} SUCCESSFULLY ADDED TO DATABASE`);
//     }
// });
// RETRIEVE
Cat.find({}, function(err,cats){
    if(err){
        console.log("SOMETHING WENT WRONG");
        console.log(err);
    } else {
        console.log("ALL THE CATS IN THE DATABASE");
        console.log(cats);
    }
})
