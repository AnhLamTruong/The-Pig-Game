'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Staring conditions
score0El.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add('hidden');

//Function

const reset = function () {
  if (player1El.classList.contains('player--active')) {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //Staring conditions
  score0El.textContent = 0;
  score1EL.textContent = 0;
  diceEl.classList.add('hidden');
};

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const randomDice = function () {
  // Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // Check if the dice or roll 1:
  //if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // current0El.textContent = currentScore;
  } else {
    //Switch to the next player
    switchplayer();
  }
};

const addTotal = function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    //Finish the game.
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch to another player.
      switchplayer();
    }
  }
};

//EventListener
btnRoll.addEventListener('click', function () {
  if (playing) {
    randomDice();
  }
});
btnHold.addEventListener('click', addTotal);
btnNew.addEventListener('click', reset);
