'use strict';
// Selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  diceEl.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

// Starting conditions
score0el.textContent = 0;
score1el.textContent = 0;
diceEl.classList.add('hidden');

// Rolling Dice Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for 1: if true, then next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //add current score to active player's score
  scores[activePlayer] += currentScore;
  // scores[1] = scores[1]+currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //check if player's score is >=20
  if (scores[activePlayer] >= 20) {
    //finish the game
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
  //switch players
  switchPlayer();
});

//reset with new logic

btnNew.addEventListener('click', init);

//reset scores with my orginal logic
// btnNew.addEventListener('click', function () {

//   playing = true;
//   scores[0] = 0; //player 0
//   scores[1] = 0; //player 1
//   score0el.textContent = 0;
//   score1el.textContent = 0;
//   diceEl.classList.add('hidden');
//   document.querySelector(`.player--winner`).classList.remove('player--winner');
// });
