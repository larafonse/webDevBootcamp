var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/data_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});

//POST
var post = require("./models/post");

// USER
var user = require("./models/user");

post.create({
    title:"Forth Golden Bird", 
    content:"Or APple ill be down bruh"
},function(err,post){
        if(err){
            console.log(err);
            }else{
                user.findOne({name:"Nicolas Lara"},function(err,foundUser){
                    if(err){
                        console.log(err);
                    }else{
                        foundUser.posts.push(post);
                        foundUser.save(function(err,data){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(data);
                            }
                        });
                    }
                });
            }
    });

// var newUser = new user({
//     name:"joe ligma", 
//     email:"dragonjoe@gmail.com"
// });
// newUser.posts.push({
//     title:"Chumba Lumba", 
//     content:"some gibberish"

// })
// newUser.save(function(err,user){
//         if(err){
//             console.log(err);
//             }else{
//                 console.log(user);
//             }
//     });



// user.findOne({name:"joe ligma"},function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         user.posts.push({
//             title:"Anothe one",
//             content:"Shout out dj khaled"
//         });
//         user.save(function(err,user){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(user);
//             }
//         });
//     }
// });

// find all post of users by ref
// user.findOne({name:"Nicolas Lara"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });