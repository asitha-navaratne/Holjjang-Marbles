const playerScoreDisplay = document.getElementById("player-score");
const cpuScoreDisplay = document.getElementById("cpu-score");
const playerBetDisplay = document.getElementById("player-bet");
const cpuBetDisplay = document.getElementById("cpu-bet");
const callDisplay = document.getElementById("display-call");
const turnDisplay = document.getElementById("display-turn");
const selectBet = document.getElementById("select-bet");
const selectCall = document.getElementById("select-call");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 10;
let cpuScore = 10;

let playerBet = 0;
let cpuBet = 0;

const calls = ["odd", "even"];

let playerCall = "null";
let cpuCall = "null";

let playerTurn = true;

submitBtn.addEventListener("click", function () {
  if (selectBet.value === 0 || selectCall.value === "null") {
    callDisplay.innerText = "Incorrect bet!";
  } else {
    if (playerTurn) {
      playerBet = parseInt(selectBet.value);
      cpuBet = Math.round(Math.random() * 4) + 1;

      playerCall = selectCall.value;

      playerBetDisplay.innerText = playerBet;
      cpuBetDisplay.innerText = cpuBet;

      callDisplay.innerText = playerCall;

      if (playerCall === "even") {
        if (cpuBet % 2 === 0) {
          playerScore += cpuBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore -= cpuBet;
          cpuScoreDisplay.innerText = cpuScore;
        } else {
          playerScore -= cpuBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore += cpuBet;
          cpuScoreDisplay.innerText = cpuScore;
        }
      } else {
        if (cpuBet % 2 === 0) {
          playerScore -= cpuBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore += cpuBet;
          cpuScoreDisplay.innerText = cpuScore;
        } else {
          playerScore += cpuBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore -= cpuBet;
          cpuScoreDisplay.innerText = cpuScore;
        }
      }

      playerTurn = false;
      turnDisplay.innerText = "CPU turn!";
    } else {
      playerBet = parseInt(selectBet.value);
      cpuBet = Math.round(Math.random() * 4) + 1;

      cpuCall = calls[Math.round(Math.random())];

      playerBetDisplay.innerText = playerBet;
      cpuBetDisplay.innerText = cpuBet;

      callDisplay.innerText = cpuCall;

      if (cpuCall === "odd") {
        if (playerBet % 2 === 0) {
          playerScore += playerBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore -= playerBet;
          cpuScoreDisplay.innerText = cpuScore;
        } else {
          playerScore -= playerBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore += playerBet;
          cpuScoreDisplay.innerText = cpuScore;
        }
      } else {
        if (playerBet % 2 === 0) {
          playerScore -= playerBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore += playerBet;
          cpuScoreDisplay.innerText = cpuScore;
        } else {
          playerScore += playerBet;
          playerScoreDisplay.innerText = playerScore;
          cpuScore -= playerBet;
          cpuScoreDisplay.innerText = cpuScore;
        }
      }

      playerTurn = true;
      turnDisplay.innerText = "Your turn!";
    }
  }
});
