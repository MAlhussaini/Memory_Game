// Getting elements from the DOM
let cards = document.querySelectorAll(".card"); // All cards in the DOM
// Getting all cards Symbols
let cardArray = document.querySelector(".deck").getElementsByTagName("i");
let moves = document.querySelector(".moves");
let timer = document.querySelector(".timer");

// Initializing global variables.
let card1, class1, class2;
let timeInterval, starInterval;
let cardFlag = 0;
let matchCounter = 0,
  movesCounter = 0;
let second = 0,
  minute = 0;

moves.textContent = movesCounter; // Initializing the HTML moves text to zero

// Adding event listener for all the cards
for (const card of cards) {
  card.addEventListener("click", cardSelect);
}

// Shuffle and render the cards on deck
// The idea from http://stackoverflow.com/a/2450976
function shuffle(arrayList) {
  let arrayLength = arrayList.length + 1;
  let randomIndex;
  let temporaryValue;
  for (let i = 0; i < arrayList.length; i++) {
    randomIndex = Math.floor(Math.random() * arrayLength);
    if (randomIndex === 16) {
      randomIndex -= 1;
    }
    temporaryValue = arrayList[i].className;
    arrayList[i].className = arrayList[randomIndex].className;
    arrayList[randomIndex].className = temporaryValue;
    console.log(arrayList[i]);
  }
  return arrayList;
}

// Toggle all the cards to show its face.
function toggleCards() {
  for (const element of cards) {
    element.classList.toggle("show");
  }
}

// Timer function
function startTimer() {
  timer.innerHTML = "GO!";
  toggleStyle("start", timer);

  setTimeout(function() {
    toggleStyle("start", timer);
    timer.innerHTML = minute + "m " + second + "s";
  }, 850);
  timeInterval = setInterval(function() {
    timer.innerHTML = minute + "m " + second + "s";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

// Toggle a DOM element by a givin css style.
function toggleStyle(stylingClass, args) {
  args.classList.toggle(stylingClass);
}

// Event listener function, selecting cards.
function cardSelect() {
  // Check if this is the first card of the game, then start the timer functions.
  if (cardFlag === 0) {
    startTimer();
    starRating();
    cardFlag = 1;
  }
  // Call the cards logic function, only if the card is not flipped already.
  if (
    this.classList.contains("match") === false &&
    this.classList.contains("show") === false &&
    this.classList.contains("no-match") === false
  ) {
    this.setAttribute("class", "show open card");
    cardLogic(this);
  }
}

// The logic after selecting a card, and the brain of the game.
function cardLogic(element) {
  // Checking if the card selected is the first of 2 cards. Else it is the second card.
  if (cardFlag === 1) {
    // Getting the class of the first card.
    class1 = element.firstElementChild.className;
    cardFlag = 2; // Setting the flag to wait for the second card.
    card1 = element; // Taking the DOM element of the first card.
  } else {
    if (cardFlag === 2) {
      // Getting the class of the second card.
      class2 = element.firstElementChild.className;
      if (class1 === class2) {
        cardLatch(card1); // Latch the first card
        cardLatch(element); // Latch the second card
      } else {
        cardReset(card1); // Reset the first card
        cardReset(element); // Reset the second card
      }
      movesCounter += 1;
      moves.textContent = movesCounter;
    }
    cardFlag = 1; // Setting the flag to wait for the first card again.
  }
  // Check if the game had reach to an end.
  if (matchCounter === 16) {
    gameOver();
  }
}

// Implementing a card match styling for matched cards.
function cardLatch(element) {
  element.setAttribute("class", "match card");
  matchCounter += 1;
}

// Implement a wrong cards styling, then reset the styling of the cards to hide them.
function cardReset(element) {
  element.setAttribute("class", "card no-match");
  setTimeout(function() {
    element.classList.remove("no-match");
  }, 700);
}

// Calculating the stars taking based on time spent playing.
function starRating() {
  let stars, theStar;
  let counter = 0,
    oneStar = 25, // One star condition threshold.
    twoStars = 19; // Two stars condition threshold.
  starInterval = setInterval(function() {
    counter++;
    // Remove one star if condition met.
    if (counter === twoStars || counter === oneStar) {
      stars = document.querySelector(".stars");
      theStar = stars.firstElementChild;
      stars.removeChild(theStar);
    }
  }, 1000);
}

// Ending the game.
function gameOver() {
  clearInterval(timeInterval);
  clearInterval(starInterval);
  congratsPopup(); // Showing the congratulation popup. 
}

// Showing the congratulation message after the game ends.
function congratsPopup() {
  // Getting stat elements from the DOM
  moves = document.querySelector(".moves").innerHTML;
  popMoves = document.querySelector("#moves");
  timer = document.querySelector(".timer").innerHTML;
  popTimer = document.querySelector("#play-time");
  stars = document.querySelector(".stars").innerHTML;
  popStars = document.querySelector("#starRating");

  // Repainting the HTML popup with the game stats.
  popMoves.textContent = moves;
  popTimer.textContent = timer;
  popStars.innerHTML = stars;

  // Unhide the game popup.
  document.querySelector(".overlay").setAttribute("class", "overlay unhide");
}

// Function to restart the game. (Called by a button)
function restartGame() {
  location.reload();
}

// Shuffle the cards at the start of the game.
cardArray = shuffle(cardArray);

// Toggle all the cards for 3s at the start of the game.
setTimeout(toggleCards, 300);
setTimeout(toggleCards, 3000);
