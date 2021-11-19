const turnDisplay = document.getElementById("display-turn");
const callDisplay = document.getElementById("display-call");
const selectBet = document.getElementById("select-bet");
const selectCall = document.getElementById("select-call");
const selectCallSection = document.getElementById("select-call-div");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

const player = {
  score: 4,
  bet: 0,
  scoreDisplay: document.getElementById("player-score"),
  betDisplay: document.getElementById("player-bet"),
};

const cpu = {
  score: 10,
  bet: 0,
  scoreDisplay: document.getElementById("cpu-score"),
  betDisplay: document.getElementById("cpu-bet"),
};

isPlayersTurn = true;
isBetValid = false;
isCallValid = false;

const generateCpuBet = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

selectBet.addEventListener("input", function () {
  if (parseInt(this.value) < player.score) {
    isBetValid = true;
    callDisplay.innerText = isCallValid
      ? "Take your chances!"
      : "Make your call!";
  } else {
    isBetValid = false;
    callDisplay.innerText = "You do not have enough marbles for that bet!";
  }
});

selectCall.addEventListener("input", function () {
  isCallValid = true;
  callDisplay.innerText = isBetValid ? "Take your chances!" : "Place a bet!";
});

submitBtn.addEventListener("click", function () {
  if (isBetValid && isCallValid) {
    isPlayersTurn = false;
  } else {
    callDisplay.innerText = isBetValid
      ? "Please make a call!"
      : "Please place a bet!";
  }
});

resetBtn.addEventListener("click", function () {
  console.log("click");
});
