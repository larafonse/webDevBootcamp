// TODO LIST
// list=[];
// x="try";
// while(x!="quit"){
//     x = prompt("what whould you like to do?");
//     if(x=="list"){
//         console.log(list);
//     }
//     else if(x=="new"){
//         newItem = prompt("what would you like to add?");
//         list.push(newItem);
//     }
// }

// ARRAY ITERATION

// color=['chumba','dog','cat','pasta']
// function printColor(x){
//     console.log('*********');
//     console.log(x);
//     console.log('*********')
// }

// color.forEach(printColor)
// color.forEach(function(element){
//     console.log(element);
// });

// CREATING OWN FOREACH
arry=[1,2,3,4,5,6]
function print(x){
    console.log(x);
}

function myForeach(ar, func){
    for(var i=0; i<ar.length; i++){
        func(arry[i])
    }
}

myForeach(arry,print)