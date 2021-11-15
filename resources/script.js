const playerScoreDisplay = document.getElementById("player-score");
const cpuScoreDisplay = document.getElementById("cpu-score");
const playerBetDisplay = document.getElementById("player-bet");
const cpuBetDisplay = document.getElementById("cpu-bet");
const turnDisplay = document.getElementById("display-turn");
const callDisplay = document.getElementById("display-call");
const selectBet = document.getElementById("select-bet");
const selectCall = document.getElementById("select-call");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 10;
let cpuScore = 10;

let playerBet = 0;
let cpuBet = 0;
let playerCall = "null";
let cpuCall = "null";

const calls = ["odd", "even"];

let isPlayersTurn = true;

submitBtn.addEventListener("click", function () {
  if (playerScore != 0 || cpuScore != 0) {
    if (parseInt(selectBet.value) === 0) {
      callDisplay.innerText = "Please place a bet!";
    } else if (selectCall.value === "null") {
      callDisplay.innerText = "Please make a call!";
    } else {
      if (isPlayersTurn) {
        playerBet = parseInt(selectBet.value);
        if (playerBet <= playerScore) {
          cpuBet = Math.round(Math.random() * 4) + 1;

          playerCall = selectCall.value;

          playerBetDisplay.innerText = playerBet.toString();
          cpuBetDisplay.innerText = cpuBet.toString();

          callDisplay.innerText = `Player calls ${playerCall}`;

          if (playerCall === "even") {
            if (cpuBet % 2 === 0) {
              playerScore += cpuBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore -= cpuBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            } else {
              playerScore -= cpuBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore += cpuBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            }
          } else {
            if (cpuBet % 2 === 0) {
              playerScore -= cpuBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore += cpuBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            } else {
              playerScore += cpuBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore -= cpuBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            }
          }

          isPlayersTurn = false;
          turnDisplay.innerText = "CPU's turn!";
        } else {
          callDisplay.innerText = "Not enough money to make this bet! 🤑";
        }
      } else {
        playerBet = parseInt(selectBet.value);
        if (playerBet <= playerScore) {
          cpuBet = Math.round(Math.random() * 4) + 1;

          cpuCall = calls[Math.round(Math.random())];

          playerBetDisplay.innerText = playerBet.toString();
          cpuBetDisplay.innerText = cpuBet.toString();

          callDisplay.innerText = `CPU calls ${cpuCall}`;

          if (cpuCall === "odd") {
            if (playerBet % 2 === 0) {
              playerScore += playerBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore -= playerBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            } else {
              playerScore -= playerBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore += playerBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            }
          } else {
            if (playerBet % 2 === 0) {
              playerScore -= playerBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore += playerBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            } else {
              playerScore += playerBet;
              playerScoreDisplay.innerText = playerScore.toString();
              cpuScore -= playerBet;
              cpuScoreDisplay.innerText = cpuScore.toString();
            }
          }

          isPlayersTurn = true;
          turnDisplay.innerText = "Your turn!";
        } else {
          callDisplay.innerText = "Not enough money to make this bet! 🤑";
        }
      }
    }
  } else {
    turnDisplay.innerText =
      playerScore === 0 ? "Player wins! 🎉" : "Player lost! 💩";
  }
});

resetBtn.addEventListener("click", function () {
  turnDisplay.innerText = "Your turn!";
  isPlayersTurn = true;
  playerScore = 10;
  cpuScore = 10;
  playerScoreDisplay.innerText = "0";
  cpuScoreDisplay.innerText = "0";
  playerBet = 0;
  cpuBet = 0;
  playerBetDisplay.innerText = "0";
  cpuBetDisplay.innerText = "0";
  callDisplay.innerText = "Place your bet";
  selectBet.value = "0";
  selectCall.value = "null";
});
