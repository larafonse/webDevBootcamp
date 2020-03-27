//create secretNumber
var secretNumber= Math.round(Math.random()*11);


var guess = Number(prompt("Guess a number"));

while(secretNumber!=guess){
	guess=prompt("Try again");
}

alert("You got it!");