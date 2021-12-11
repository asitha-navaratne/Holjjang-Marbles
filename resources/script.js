const callDisplay = document.getElementById("display-call");
const selectWager = document.getElementById("select-wager");
const selectCall = document.getElementById("select-call");
const selectCallDiv = document.getElementById("select-call-div");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");

const player = {
  score: 10,
  wager: 0,
  scoreDisplay: document.getElementById("player-score"),
  wagerDisplay: document.getElementById("player-wager"),
};

const cpu = {
  score: 10,
  wager: 0,
  scoreDisplay: document.getElementById("cpu-score"),
  wagerDisplay: document.getElementById("cpu-wager"),
};

let call = "";
const callList = ["odd", "even"];

let isPlayersTurn = true;
let isWagerValid = false;
let isCallValid = false;

const generateWager = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

const determineWinner = function (call, player1, player2) {
  callDisplay.innerText = `${isPlayersTurn ? "Player" : "CPU"} called ${call}!`;
  if (
    (call === "even" && player2.wager % 2 === 0) ||
    (call === "odd" && player2.wager % 2 !== 0)
  ) {
    player1.score += player1.wager;
    player2.score -= player1.wager;
  } else {
    player1.score -= player1.wager;
    player2.score += player1.wager;
  }
  player1.scoreDisplay.innerText = player1.score;
  player2.scoreDisplay.innerText = player2.score;
};

const initialize = function () {
  isWagerValid = false;
  isPlayersTurn ? (isCallValid = false) : (isCallValid = true);

  selectWager.value = "";
  selectCall.value = "";
};

selectWager.addEventListener("input", function () {
  if (parseInt(this.value) < player.score) {
    isWagerValid = true;
    callDisplay.innerText = isCallValid
      ? "Take your chances!"
      : "Make your call!";
  } else {
    isWagerValid = false;
    callDisplay.innerText = "You do not have enough marbles for that wager!";
  }
});

selectCall.addEventListener("input", function () {
  isCallValid = true;
  callDisplay.innerText = isWagerValid
    ? "Take your chances!"
    : "Place a wager!";
});

playBtn.addEventListener("click", function () {
  if (isWagerValid && isCallValid) {
    player.wager = parseInt(selectWager.value);
    cpu.wager = generateWager(cpu.score);

    player.wagerDisplay.innerText = player.wager;
    cpu.wagerDisplay.innerText = cpu.wager;
    if (isPlayersTurn) {
      call = selectCall.value;
      determineWinner(call, player, cpu);
      selectCallDiv.style.setProperty("visibility", "hidden");
      isPlayersTurn = false;
    } else {
      call = callList[Math.round(Math.random())];
      determineWinner(call, cpu, player);
      selectCallDiv.style.setProperty("visibility", "visible");
      isPlayersTurn = true;
    }
    initialize();
  } else {
    callDisplay.innerText = isWagerValid
      ? "Please make a call!"
      : "Please place a wager!";
  }
});

resetBtn.addEventListener("click", function () {
  initialize();
  isPlayersTurn = true;
  selectCallDiv.style.setProperty("visibility", "visible");
  callDisplay.innerText = "Place a wager and make a call!";
  for (let p of [player, cpu]) {
    p.score = 10;
    p.wager = 0;
    p.scoreDisplay.innerText = 10;
    p.wagerDisplay.innerText = 0;
  }
});
