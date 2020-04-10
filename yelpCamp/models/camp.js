var mongoose = require("mongoose");
var campSchema = new mongoose.Schema({
    name:String,
    img:String,
    description:String,
    comments:[
         {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Comment"
         }
    ]
});
module.exports = mongoose.model("Camp",campSchema);

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