const turnDisplay = document.getElementById("display-turn");
const callDisplay = document.getElementById("display-call");
const selectBet = document.getElementById("select-bet");
const selectCall = document.getElementById("select-call");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

const player = {
  score: 10,
  bet: 0,
  call: "",
  scoreDisplay: document.getElementById("player-score"),
  betDisplay: document.getElementById("player-bet"),
};

const cpu = {
  score: 10,
  bet: 0,
  call: "",
  scoreDisplay: document.getElementById("cpu-score"),
  betDisplay: document.getElementById("cpu-bet"),
};

const players = [player, cpu];

let isPlayersTurn = true;
let isBetValid = false;
let isPlayerWinner = false;

const callList = ["odd", "even"];

const generateCpuBet = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

selectBet.addEventListener("input", function () {
  if (parseInt(selectBet.value) > player.score) {
    callDisplay.innerText = "Not enough money to make this bet!";
    isBetValid = false;
  } else {
    isBetValid = true;
  }
});

submitBtn.addEventListener("click", function () {
  if (isBetValid) {
  } else {
    callDisplay.innerText = "Please make a valid bet!";
  }
});

resetBtn.addEventListener("click", function () {
  isPlayersTurn = true;
  isBetValid = false;
  isPlayerWinner = false;

  players.forEach((player) => {
    player.score = 10;
    player.bet = 0;
    player.call = "";
    player.scoreDisplay.innerText = "10";
    player.betDisplay.innerText = "0";
  });

  turnDisplay.innerText = "Your turn!";
  callDisplay.innerText = "Place your bet";

  selectBet.value = "";
  selectCall.value = "";
});
