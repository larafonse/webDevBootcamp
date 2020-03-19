
var numSquares = 6;
var colors =  generateColors(numSquares);
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var colorSquare = document.querySelectorAll(".square");
var pickedColor = pickColor();
var rgbCurrentColor = document.querySelector("#rgb");
var tryAgainText = document.querySelector("#tryAgain");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
rgbCurrentColor.textContent = pickedColor;


easyBtn.addEventListener("click", function(){
    tryAgainText.textContent = "";
    h1.style.backgroundColor = "steelblue";
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares=3;
    colors = generateColors(numSquares);
    pickedColor = pickColor(colors);
    rgbCurrentColor.textContent = pickedColor;
    for(var i = 0; i<colorSquare.length; i++){
        if(i < 3){
            colorSquare[i].style.backgroundColor = colors[i];
        }
        else{
            colorSquare[i].style.display = "none";
        }
    }
});
hardBtn.addEventListener("click", function(){
    tryAgainText.textContent = "";
    h1.style.backgroundColor = "steelblue";
    numSquares=6;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    colors = generateColors(numSquares);
    pickedColor = pickColor(colors);
    rgbCurrentColor.textContent = pickedColor;
    for(var i = 0; i<colorSquare.length; i++){
        colorSquare[i].style.backgroundColor = colors[i];
        colorSquare[i].style.display = "block";
    }
});

for(var i = 0; i<colorSquare.length;i++){
    // Add colors to squares
    colorSquare[i].style.backgroundColor = colors[i];
    // Add click listeners to squares
    colorSquare[i].addEventListener("click", function(){

        if(this.style.backgroundColor == pickedColor){
            tryAgainText.textContent = "Success!";
            resetButton.textContent = "Play Again?";
            for(var j = 0; j<colorSquare.length; j++){
                colorSquare[j].style.backgroundColor = this.style.backgroundColor;
                h1.style.backgroundColor = this.style.backgroundColor;
            }
        }
        else{
            this.style.backgroundColor = "#232323";
            tryAgainText.textContent = "Try Again!";

        }
    });
}

resetButton.addEventListener("click", function(){
    colors =  generateColors(numSquares);
    pickedColor = pickColor();
    rgbCurrentColor.textContent = pickedColor;

    for(var i = 0; i<colorSquare.length;i++){
        colorSquare[i].style.backgroundColor = colors[i];
    }
    resetButton.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue";
    tryAgainText.textContent = "";

})

function pickColor(){
    index = Math.floor(Math.random() * colors.length);
    return colors[index];
}
function generateColors(num){
    var arr = []

    for(var i = 0 ; i<num; i++){
        arr.push(randomColor()); 
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb("+r+", "+g+", "+b+")";
    
}