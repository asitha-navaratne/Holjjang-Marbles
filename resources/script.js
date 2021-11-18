const turnDisplay = document.getElementById("display-turn");
const callDisplay = document.getElementById("display-call");
const selectBet = document.getElementById("select-bet");
const selectCall = document.getElementById("select-call");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

const player = {
  score: 10,
  bet: 0,
  scoreDisplay: document.getElementById("player-score"),
  betDisplay: document.getElementById("player-bet"),
  setDisplayValues: setDisplayValues,
};

const cpu = {
  score: 10,
  bet: 0,
  scoreDisplay: document.getElementById("cpu-score"),
  betDisplay: document.getElementById("cpu-bet"),
  setDisplayValues: setDisplayValues,
};

let call = "";
const callList = ["odd", "even"];

let isPlayersTurn = true;
let isBetValid = false;

const generateCpuBet = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

const determineWinner = function (call, player1, player2) {
  if (
    (call === "even" && player2.bet % 2 === 0) ||
    (call === "odd" && player2.bet % 2 !== 0)
  ) {
    player1.score += player2.bet;
    player2.score -= player2.bet;
  } else {
    player1.score -= player2.bet;
    player2.score += player2.bet;
  }
  player1.setDisplayValues();
  player2.setDisplayValues();
};

function setDisplayValues() {
  this.scoreDisplay.innerText = this.score;
  this.betDisplay.innerText = this.bet;
}

selectBet.addEventListener("input", function () {
  if (parseInt(this.value) > player.score) {
    callDisplay.innerText = "Not enough money to make this bet!";
    isBetValid = false;
  } else {
    isBetValid = true;
    callDisplay.innerText = "Make your call";
    player.bet = parseInt(selectBet.value);
    cpu.bet = generateCpuBet(cpu.score);
  }
});

submitBtn.addEventListener("click", function () {
  if (isBetValid) {
    if (isPlayersTurn) {
      call = selectCall.value;
      callDisplay.innerText = `Player called ${call}!`;
      determineWinner(call, player, cpu);
      isPlayersTurn = false;
      turnDisplay.innerText = "Opponent's turn";
    } else {
      call = callList[Math.round(Math.random())];
      callDisplay.innerText = `CPU called ${call}!`;
      determineWinner(call, cpu, player);
      isPlayersTurn = true;
      turnDisplay.innerText = "Your turn";
    }
  } else {
    callDisplay.innerText = "Please make a valid bet!";
  }
});

resetBtn.addEventListener("click", function () {
  isPlayersTurn = true;
  isBetValid = false;

  for (let p of [player, cpu]) {
    p.score = 10;
    p.bet = 0;
    p.scoreDisplay.innerText = "10";
    p.betDisplay.innerText = "0";
  }

  turnDisplay.innerText = "Your turn!";
  callDisplay.innerText = "Place your bet";

  selectBet.value = "1";
  selectCall.value = "odd";
});
