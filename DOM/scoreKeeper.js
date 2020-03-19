var buttons = document.querySelectorAll("button");
var h1 = document.querySelector("h1");
var maxScoreInput = document.querySelector("input");
var maxScore = document.querySelector("#maxScore");
var p1Score = document.querySelector("#p1Score");
var p2Score = document.querySelector("#p2Score");
var text = maxScoreInput.value;


var p1currentScore =0;
var p2currentScore =0;

buttons[0].addEventListener("click", function(){
    if(p1currentScore<maxScore.textContent && p2currentScore< maxScore.textContent){
        p1currentScore++;
        if (p1currentScore == maxScore.textContent){
            p1Score.classList.add("green");
        }
        p1Score.textContent = p1currentScore;
    }
});

buttons[1].addEventListener("click", function(){
    if(p1currentScore<maxScore.textContent && p2currentScore< maxScore.textContent){
        p2currentScore++;
        if (p2currentScore == maxScore.textContent){
            p2Score.classList.add("green");
        }
        p2Score.textContent = p2currentScore;
    }
});

buttons[2].addEventListener("click", function(){
    p1currentScore =0;
    p2currentScore =0;
    p1Score.textContent = p1currentScore;
    p2Score.textContent = p2currentScore;
    maxScore.textContent= 5;  
    maxScoreInput.value = text;
    p1Score.classList.remove("green");
    p2Score.classList.remove("green");

});

maxScoreInput.addEventListener("input",function(){
    maxScore.textContent= this.value;

});
