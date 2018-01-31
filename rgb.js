var aSquares = [];
var sPickedColour;
var aModes = document.querySelectorAll(".mode");
var numberOfSquares = 2;
var oGameBoard = document.querySelector("#gameBoard")
var lLives = 3;
var lLevel = 1;
var lBestLevel = 1;
var bHex = false

function setColours() {
	while(oGameBoard.hasChildNodes())
	{
	   oGameBoard.removeChild(oGameBoard.firstChild);
	}

	for (var i = 0; i < numberOfSquares; i++){
		var oDiv = document.createElement("div");
		oDiv.classList.add("square")
		oDiv.style.backgroundColor = createRandomRGB();
		if (numberOfSquares > 6){
			oDiv.style.width = "20%"
			oDiv.style.paddingBottom = "20%"
		} else if (numberOfSquares > 16) {
			oDiv.style.width = "15%"
			oDiv.style.paddingBottom = "15%"
		}
		oGameBoard.appendChild(oDiv);
	}

	aSquares = document.querySelectorAll(".square");
}

function setSquares() {
	for (var i = 0; i < aSquares.length; i++) {
		aSquares[i].addEventListener("click", function(){
			if (this.style.backgroundColor == sPickedColour){
				document.querySelector("#messagebox").textContent = "Win! Level Up!";
				numberOfSquares += 2;
				turnOnSquares();
				lLevel++;
				if (lLevel%5 == 0){
					//reached a level 5, 10, 15 etc so give bonus life
					lLives++
					document.querySelector("#messagebox").textContent = "Bonus Life"
				}
			} else {
				if (lLives === 0) {
					endGame();
				} else {
					lLives--;
					document.querySelector("#livesleft").textContent = lLives;
					document.querySelector("#messagebox").textContent = "Uh Oh, life lost!"
					this.style.backgroundColor = "#201f20";
				}
			}
		})
	}
}

function endGame(){
	document.querySelector("#messagebox").textContent = "GAME OVER!"
	for (var i = 0; i < aSquares.length; i++){
		aSquares[i].style.backgroundColor = "#201f20";
	}
}

function createRandomRGB() {

	r = Math.floor(Math.random() * 256);
	g = Math.floor(Math.random() * 256);
	b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function turnOnSquares(){
	for (var i = 0; i < aSquares.length; i++){
		aSquares[i].style.backgroundColor = sPickedColour;
	}
//debugger
	setTimeout(initialise, 2000);
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

function initialise() {
	//alert(numberOfSquares)
	setColours()
	setSquares()

	document.querySelector("#livesleft").textContent = lLives;
	document.querySelector("#level").textContent = lLevel;
	document.querySelector("#messagebox").textContent = "Good Luck!";


	var i = Math.floor(Math.random() * (numberOfSquares-1));
	sPickedColour = aSquares[i].style.backgroundColor;

	if (bHex) {
		document.querySelector("#chosencolor").textContent = colorToHex(sPickedColour);
	} else {
		document.querySelector("#chosencolor").textContent = sPickedColour;
	}

	document.querySelector("#reset").addEventListener("click", reset);

	for (var j = 0; j<aModes.length; j++){
		aModes[j].addEventListener("click", function(){
			aModes[0].classList.remove("selected");
			aModes[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? bHex = false: bHex = true;
			reset();
		})
	}
}

function reset(){
	numberOfSquares = 2;
	lLives = 3;
	lLevel = 1;
	initialise()
}

initialise()
