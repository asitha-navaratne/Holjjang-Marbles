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

let call = "null";
const callsList = ["odd", "even"];

let isPlayersTurn = true;
let isBetValid = true;
let isPlayerWinner = false;

const generateCpuBet = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

const determineWinner = (call, playerBet, cpuBet) => {
  if (isPlayersTurn) {
    return call === "even"
      ? cpuBet % 2 === 0
        ? true
        : false
      : cpuBet % 2 === 0
      ? false
      : true;
  } else {
    return call === "even"
      ? playerBet % 2 === 0
        ? false
        : true
      : cpuBet % 2 === 0
      ? true
      : false;
  }
};

selectBet.addEventListener("input", () => {
  if (parseInt(selectBet.value) > playerScore) {
    callDisplay.innerText = "Not enough money to make this bet!";
    isBetValid = false;
  } else {
    isBetValid = true;
  }
});

submitBtn.addEventListener("click", function () {
  if (isBetValid) {
    call = isPlayersTurn
      ? selectCall.value
      : callsList[Math.round(Math.random())];
    if (call === "null") {
      callDisplay.innerText = "Please make a call!";
    } else {
      playerBet = parseInt(selectBet.value);
      cpuBet = generateCpuBet(cpuScore);

      callDisplay.innerText = `${
        isPlayersTurn ? "Player" : "CPU"
      } called ${call}`;

      isPlayerWinner = determineWinner(call, playerBet, cpuBet);
    }
  } else {
    callDisplay.innerText = "Please make a valid bet!";
  }
});

resetBtn.addEventListener("click", function () {
  isPlayersTurn = true;
  isBetValid = true;

  playerScore = 10;
  cpuScore = 10;
  playerBet = 0;
  cpuBet = 0;

  turnDisplay.innerText = "Your turn!";
  callDisplay.innerText = "Place your bet";
  playerScoreDisplay.innerText = "0";
  cpuScoreDisplay.innerText = "0";
  playerBetDisplay.innerText = "0";
  cpuBetDisplay.innerText = "0";

  selectBet.value = "0";
  selectCall.value = "null";
});
