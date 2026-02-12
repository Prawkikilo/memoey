var images = [
    "8 stack image.jpg", "9 stack image.jpg","10 stack image.jpg",
    "11 stack image.jpg","12 stack image.jpg","14 stack image.jpg","15 stack image.jpg","KKL09698.JPG"]; // Add image URLs here
var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;

function startGame() {
    var gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";


    var cardImages = images.concat(images); // Duplicate images for pairs
    cardImages.sort(function () {
        return Math.random() - 0.5;
    });
    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<div class="card-front"><i class="fas fa-heart"></i></div>
            <div class="card-back"><img src="${cardImages[i]}" alt=""></div>
            `;
        card.onclick = flipCard;
        card.dataset.image = cardImages[i];
        gameBoard.appendChild(card);
    }

    firstCard = null;
    secondCard = null;
    canFlip = true;
    matches = 0;
    moves = 0;
    seconds = 0;
    timerRunning = false;

    updateStats();
    clearInterval(timerInterval);


}
function flipCard() {
    if (!canFlip) return;

    if(this.classList.contains("flipped")) return;
    if(this.classList.contains("matched")) return;

    if(!timerRunning) {
        startTimer();
    }
    this.classList.add("flipped");
    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        moves++;
        updateStats();
        checkMatch();

    }
}
function checkMatch() {
    var match = firstCard.dataset.image === secondCard.dataset.image;
    if (match) {
        setTimeout(() => {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matches++;
            updateStats();
            resetCards();
            if (matches === 8) {
                endgame();
            }
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}
function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(() => {
        seconds++;
        updateStats();
    }, 1000);
}
function updateStats() {
    document.getElementById("moves").innerText = moves;
    document.getElementById("matches").innerText = matches + "/8";

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    if(secs < 10) secs = '0' + secs;
    document.getElementById("time").textContent = mins + ":" + secs;
}
function endgame() {
    clearInterval(timerInterval);
    document.getElementById("finalMoves").textContent = moves;
    document.getElementById("finalTime").textContent = 
        document.getElementById("time").textContent;
        document.getElementById("winModal").classList.add("show");

}
function newGame() {
    document.getElementById("winModal").classList.remove("show");
    clearInterval(timerInterval);
    startGame();
}
startGame() 











































