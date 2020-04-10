var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
    {
        name:"Acorn Oaks Campground",
        img:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description:"Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass."
    },
    {
        name:"Beaver Point Camping & Fishing Grounds",
        img:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description:"Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass."
    },
    {
        name:"Rupert’s Resort Campground",
        img:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
        description:"Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass."
    }
    
]

function seedDB(){
    Camp.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("seed removed");
            data.forEach(function(seed){
                Camp.create(seed,function(err,camp){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a camp");
                        Comment.create({
                            text:"This place is great, but I wish there was internet.",
                            author:"Joe"
                        }, function(err,comment){
                            if(err){
                                console.log(err,comment);
                            }else{
                                console.log(comment);
                                camp.comments.push(comment);
                                camp.save();
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;