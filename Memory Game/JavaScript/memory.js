let cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lock = false;
let tries = 0;  
let wins = 0;  
let missmove=0;  


let timer; 
let timeLeft = 120; 

function startTimer() {
    clearInterval(timer); 
    timeLeft = 120;

    timer = setInterval(() => {
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;

        document.getElementById("timer").innerText =
            `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
        
            cards.forEach(card => card.removeEventListener("click", flipCard));
            document.getElementById("resultShow").innerText = "⏰ Time's up!";
        }

        timeLeft--;
    }, 1000);
}



function flipCard() {
    if (lock || this === firstCard) return; 
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}


function checkMatch() {
    lock = true;
    tries++;
    document.getElementById("result").innerText = tries;

    if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
        wins++;
        document.getElementById("resultwin").innerText = wins;
        disableCards();
    } else {
        unflipCards();
    }
}


function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetTurn();
    checkWin();
}


function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTurn();
    }, 1000);
}


function resetTurn() {
    [firstCard, secondCard, lock] = [null, null, false];
}

function shuffle() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * cards.length);
    });
}


function resetGame() {
    tries = 0;
    wins = 0;
    document.getElementById("result").innerText = 0;
    document.getElementById("resultwin").innerText = 0;
    document.getElementById("resultShow").innerText = "";
    document.getElementById("timer").innerHTML="02:00";
    document.getElementById("missmove").innerHTML=0;

    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });

    resetTurn();
    shuffle();
    startTimer();
}

// check if all cards flipped
function checkWin() {
    let accu=0;
    if (document.querySelectorAll(".flip").length === cards.length) {
        document.getElementById("resultShow").innerText = "🎉 You matched all cards!";
           
            
            accu = Math.floor((wins / tries) * 100);
            missmove=tries-wins;

            document.getElementById("accuracy").innerHTML=`${accu}%`;
            document.getElementById("missmove").innerHTML=missmove;
    }
}

// start game
function startGame() {
    shuffle();
    cards.forEach(card => card.addEventListener("click", flipCard));
    document.getElementById("startButton").remove();
    startTimer();
}

// buttons
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("resetButton").addEventListener("click", resetGame);
