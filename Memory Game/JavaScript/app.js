const cards = document.querySelectorAll(".card");
let flippedCards = [];
let lockBoard = false;

// Shuffle cards at start
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Flip card on click
cards.forEach(card => {
  card.addEventListener("click", () => {
    if (lockBoard) return;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });
});

// Check match
function checkForMatch() {
  let [card1, card2] = flippedCards;
  let isMatch = card1.dataset.fruit === card2.dataset.fruit;

  if (isMatch) {
    disableCards(card1, card2);
  } else {
    unflipCards(card1, card2);
  }
}

// Keep matched cards flipped
function disableCards(card1, card2) {
  card1.removeEventListener("click", flipCard);
  card2.removeEventListener("click", flipCard);
  flippedCards = [];
}

// Flip back if not match
function unflipCards(card1, card2) {
  lockBoard = true;
  setTimeout(() => {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
    lockBoard = false;
  }, 1000);
}
