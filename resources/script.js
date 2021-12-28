const selectWager = document.getElementById("select-wager");
const selectCall = document.getElementById("select-call");
const callDisplay = document.getElementById("display-call");
const winDisplay = document.getElementById("display-win");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const continueBtn = document.getElementById("continue-btn");
const winDisplayContainer = document.getElementById("display-win-container");
const selectCallContainer = document.getElementById("select-call-container");
const playerControls = document.getElementById("player-controls-container");
const continueBtnContainer = document.getElementById("continue-btn-container");

const player = {
  name: "Player",
  score: 10,
  wager: 0,
  emoji: "🎉",
  winningTileClass: "player-winner",
  tile: document.getElementById("player-tile"),
  scoreDisplay: document.getElementById("player-score"),
  wagerDisplay: document.getElementById("player-wager"),
};

const cpu = {
  name: "CPU",
  score: 10,
  wager: 0,
  emoji: "😪",
  winningTileClass: "cpu-winner",
  tile: document.getElementById("cpu-tile"),
  scoreDisplay: document.getElementById("cpu-score"),
  wagerDisplay: document.getElementById("cpu-wager"),
};

let isPlayersTurn = true;
let isWagerValid = false;
let isCallValid = false;

let call = "";
const callList = ["odd", "even"];

const generateCpuWager = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

const displayWinner = function (player1, player2, call) {
  callDisplay.innerText = `${player1.name} called ${call}!`;
  player1.wagerDisplay.innerText = player1.wager;
  player2.wagerDisplay.innerText = player2.wager;

  playerControls.classList.add("hidden");
  continueBtnContainer.classList.remove("hidden");
  winDisplayContainer.classList.remove("hidden");

  if (
    (player2.wager % 2 === 0 && call === "even") ||
    (player2.wager % 2 !== 0 && call === "odd")
  ) {
    winDisplay.innerText = `${player1.name} wins! ${player1.emoji}`;
    player1.tile.classList.add(`${player1.winningTileClass}`);
    player1.score += player1.wager;
    player2.score -= player1.wager;

    if (player1.score >= 20) {
      player1.score = 20;
      player2.score = 0;
      continueBtn.innerHTML = "Reset";
    }
  } else {
    winDisplay.innerText = `${player2.name} wins! ${player2.emoji}`;
    player2.tile.classList.add(`${player2.winningTileClass}`);
    player1.score -= player1.wager;
    player2.score += player1.wager;

    if (player2.score >= 20) {
      player1.score = 0;
      player2.score = 20;
      continueBtn.innerHTML = "Reset";
    }
  }

  player1.scoreDisplay.innerText = player1.score;
  player2.scoreDisplay.innerText = player2.score;
};

const reset = function () {
  isPlayersTurn = true;
  isWagerValid = false;
  isCallValid = false;

  for (p of [player, cpu]) {
    p.score = 10;
    p.scoreDisplay.innerText = p.score;
  }

  selectCall.value = "";
  selectWager.value = "";

  playerControls.classList.remove("hidden");
  selectCallContainer.classList.remove("hidden");

  callDisplay.innerText = "Place a wager and make a call! 😎";
};

selectWager.addEventListener("input", function () {
  if (parseInt(this.value) <= player.score) {
    isWagerValid = true;
    callDisplay.innerText = isCallValid
      ? "Take your chances! 🙉"
      : "Make your call!";
  } else {
    isWagerValid = false;
    callDisplay.innerText = "You do not have enough marbles for that wager! ❌";
  }
});

selectCall.addEventListener("input", function () {
  isCallValid = true;
  callDisplay.innerText = isWagerValid
    ? "Take your chances! 🙉"
    : "Place your wager!";
});

playBtn.addEventListener("click", function () {
  player.wager = parseInt(selectWager.value);
  cpu.wager = generateCpuWager(cpu.score);

  if (isPlayersTurn) {
    if (isWagerValid && isCallValid) {
      call = selectCall.value;
      displayWinner(player, cpu, call);
      isPlayersTurn = false;
    } else {
      callDisplay.innerText = isWagerValid
        ? "Please make a valid call! ❌"
        : "Please place a valid wager! ❌";
    }
  } else {
    if (isWagerValid) {
      call = callList[Math.round(Math.random())];
      displayWinner(cpu, player, call);
      isPlayersTurn = true;
    } else {
      callDisplay.innerText = "Please place a valid wager! ❌";
    }
  }
});

resetBtn.addEventListener("click", reset);

continueBtn.addEventListener("click", function () {
  if (player.score === 20 || cpu.score === 20) {
    reset();
    continueBtn.innerHTML = "Continue";
  } else {
    isWagerValid = false;
    if (!isPlayersTurn) {
      isCallValid = true;
      selectCallContainer.classList.add("hidden");
    } else {
      isCallValid = false;
      selectCallContainer.classList.remove("hidden");
    }

    selectCall.value = "";
    selectWager.value = "";

    playerControls.classList.remove("hidden");

    callDisplay.innerText = isPlayersTurn
      ? "Place a wager and make a call!"
      : "Place a wager!";
  }

  for (p of [player, cpu]) {
    p.wagerDisplay.innerText = 0;
    p.tile.classList.remove(`${p.winningTileClass}`);
  }

  continueBtnContainer.classList.add("hidden");
  winDisplayContainer.classList.add("hidden");
});
