/* Core Features:
*1 - Start screen to take the name (Player as default name) and start button.
*2 - Shuffle all the cards. 
*3 - All Cards must be flipped down at the start of the game.
*4 - A click on a card flip it faced up.
*5 - If two cards clicked then latch, or hide.
*6 - Create a list that holds all of opened cards
*7 - Each 2 clicks is one move. 
*8 - Time start at the start of the game.
*9 - Restarting the game is possible. 
*10- Stars are calculated based on a formula. 
*11- At the end of the game, popup shows the stats and name of player.

Bonus:
* Flipping card animation.
* Game start: Show all the cared faced up for 3s.
* Shake the cards OR make the background color red on wrong answers.
* if the cards match, make animation and make the background green.
* Flipping card animation.
* Leaderboard
*/

// The start of the code. 

// Toggle the cards
let cards = document.querySelectorAll(".card");

function toggleCards () {
    for (const element of cards) {
        element.classList.toggle("show");
    }

}

setTimeout(toggleCards,300);
setTimeout(toggleCards,3000);

// Adding event listener to show the cards

function cardSelect() {
    this.setAttribute("class", "show open card");
}

for (const card of cards) {
    card.addEventListener("click",cardSelect)
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// !Small scale code.

function cardLatch(array) {
    for (const element of array) {
        element.classList.toggle("show");
        element.classList.toggle("open");        
        element.classList.toggle("match") ;
    }
    
}


/* 
function cardSelect() {
    this.classList.toggle("show");
    this.classList.toggle("open");        
}
 */
