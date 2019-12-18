/* Core Features:
*1 - Start screen to take the name (Player as default name) and start button.
// *2 - Shuffle all the cards. 
// *3 - All Cards must be flipped down at the start of the game.
// *4 - A click on a card flip it faced up.
// *5 - If two cards clicked then latch, or hide.
// *6 - Create a list that holds all of opened cards
// *7 - Each 2 clicks is one move. 
// *8 - Time start at the start of the game.
// *9 - Restarting the game is possible. 
// *10- Stars are calculated based on a formula. 
// *11- Time stops at the end of the game
// *12- At the end of the game, popup shows the stats and name of player.

Bonus:
* Flipping card animation.
// * Game start: Show all the cared faced up for 3s.
* Shake the cards 
// *make the background color red on wrong answers.
* if the cards match, make animation and make the background green.
* Leaderboard
* Hardness of the game (More grid / start vision is less)

Bugs:
// * you should not be able to click clicked cards. 
*/

// The start of the code.

// Toggle the cards
let cards = document.querySelectorAll(".card");

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

let cardArray = document.querySelector(".deck").getElementsByTagName("i")
console.log(cardArray);

cardArray = shuffle(cardArray);
console.log(cardArray);


function toggleCards() {
  for (const element of cards) {
    element.classList.toggle("show");
  }
}

setTimeout(toggleCards, 300);
setTimeout(toggleCards, 3000);


// Adding event listener to show the cards
let cardFlag = 0;
let card1, class1, class2;
let matchCounter = 0;
let movesCounter = 0;
let moves = document.querySelector(".moves");
moves.textContent = movesCounter;

//game timer
var second = 0,
  minute = 0;
var timer = document.querySelector(".timer");
var interval;

function gameOver() {
  moves = document.querySelector(".moves").innerHTML;
  popMoves = document.querySelector("#moves");
  timer = document.querySelector(".timer").innerHTML;
  popTimer = document.querySelector("#play-time");
  stars = document.querySelector(".stars").innerHTML;
  popStars = document.querySelector("#starRating");
  
  popMoves.textContent = moves;
  popTimer.textContent = timer;
  popStars.innerHTML = stars;
  document.querySelector(".overlay").setAttribute("class", "overlay unhide")
}

function toggleStyle(stylingClass, args) {
  args.classList.toggle(stylingClass);
}

function startTimer() {
  timer.innerHTML = "GO!";
  toggleStyle("start", timer);
  setTimeout(function() {
    toggleStyle("start", timer);
    timer.innerHTML = minute + "m " + second + "s";
  }, 850);

  interval = setInterval(function() {
    timer.innerHTML = minute + "m " + second + "s";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

function starCalc() {
  console.log("starCalc has started.")
  let counter = 0, stars, theStar;
  let oneStar = 25, twoStars = 19;
  setInterval(function() {
    counter++;
    console.log(counter);
    if (counter === twoStars || counter === oneStar) {
      console.log("if condition has started.")
      stars = document.querySelector(".stars");
      theStar = stars.firstElementChild;  
      stars.removeChild(theStar)
    }
  }, 1000);
}

function cardLatch(element) {
  element.setAttribute("class", "match card");
  matchCounter += 1;
}

function cardReset(element) {
  element.setAttribute("class", "card no-match");
  setTimeout(function() {
    element.classList.remove("no-match");
  }, 700);
}
function cardLogic(element) {
  if (cardFlag === 1) {
    class1 = element.firstElementChild.className;
    cardFlag = 2;
    card1 = element;
  } else {
    if (cardFlag === 2) {
      class2 = element.firstElementChild.className;
      if (class1 === class2) {
        cardLatch(element);
        cardLatch(card1);
      } else {
        cardReset(element);
        cardReset(card1);
      }
      movesCounter += 1;
      moves.textContent = movesCounter;
    }
    cardFlag = 1;
  }
  if (matchCounter === 16) {
    gameOver();
  }
}
function cardSelect() {
  if (cardFlag === 0) {
    startTimer();
    starCalc();
    cardFlag = 1;
  }
  if (
    this.classList.contains("match") === false &&
    this.classList.contains("show") === false &&
    this.classList.contains("no-match") === false
  ) {
    this.setAttribute("class", "show open card");
    cardLogic(this);
  }
}

for (const card of cards) {
  card.addEventListener("click", cardSelect);
}

function restartGame() {
  //! Restart page!
  location.reload();
  // TODO: Shuffle cards
  // TODO: Remove all latching cards
  // TODO: Reset moves
  // TODO: Reset time.
  // TODO: Toggle cards
}

// !Small scale code.

/* 
function cardSelect() {
    this.classList.toggle("show");
    this.classList.toggle("open");        
}
 */
