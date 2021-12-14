const callDisplay = document.getElementById("display-call");
const winDisplay = document.getElementById("display-win");
const selectWager = document.getElementById("select-wager");
const selectCall = document.getElementById("select-call");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const continueBtn = document.getElementById("continue-btn");
const winDisplayContainer = document.getElementById("display-win-container");
const selectCallContainer = document.getElementById("select-call-container");
const playerControls = document.getElementById("player-controls-container");
const continueBtnContainer = document.getElementById("continue-btn-container");

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

let isPlayersTurn = true;
let isWagerValid = false;
let isCallValid = false;

let call = "";
const callList = ["odd", "even"];

const generateWager = (score) =>
  score > 5
    ? Math.round(Math.random() * 4) + 1
    : Math.round(Math.random() * (score - 1)) + 1;

const reset = function () {
  isPlayersTurn = true;
  isWagerValid = false;
  isCallValid = false;

  player.score = 10;
  cpu.score = 10;
  player.scoreDisplay.innerText = player.score;
  cpu.scoreDisplay.innerText = cpu.score;

  selectCall.value = "";
  selectWager.value = "";

  playerControls.classList.remove("hidden");
  selectCallContainer.classList.remove("hidden");

  callDisplay.innerText = "Place a wager and make a call!";
};

selectWager.addEventListener("input", function () {
  if (parseInt(this.value) <= player.score) {
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
    : "Place your wager!";
});

playBtn.addEventListener("click", function () {
  if (isPlayersTurn) {
    if (isWagerValid && isCallValid) {
      player.wager = parseInt(selectWager.value);
      cpu.wager = generateWager(cpu.score);
      call = selectCall.value;
      player.wagerDisplay.innerText = player.wager;
      cpu.wagerDisplay.innerText = cpu.wager;
      playerControls.classList.add("hidden");
      continueBtnContainer.classList.remove("hidden");
      winDisplayContainer.classList.remove("hidden");
      if (
        (cpu.wager % 2 === 0 && call === "even") ||
        (cpu.wager % 2 !== 0 && call === "odd")
      ) {
        winDisplay.innerText = "Player wins!";
        player.score += player.wager;
        cpu.score -= player.wager;
        if (player.score >= 20) {
          player.score = 20;
          cpu.score = 0;
          continueBtn.innerHTML = "Reset";
        }
      } else {
        winDisplay.innerText = "CPU wins!";
        player.score -= player.wager;
        cpu.score += player.wager;
        if (cpu.score >= 20) {
          player.score = 0;
          cpu.score = 20;
          continueBtn.innerHTML = "Reset";
        }
      }
      callDisplay.innerText = `Player called ${call}!`;
      player.scoreDisplay.innerText = player.score;
      cpu.scoreDisplay.innerText = cpu.score;
      isPlayersTurn = false;
    } else {
      callDisplay.innerText = isWagerValid
        ? "Please make a valid call!"
        : "Please place a valid wager!";
    }
  } else {
    if (isWagerValid) {
      player.wager = parseInt(selectWager.value);
      cpu.wager = generateWager(cpu.score);
      call = callList[Math.round(Math.random())];
      player.wagerDisplay.innerText = player.wager;
      cpu.wagerDisplay.innerText = cpu.wager;
      playerControls.classList.add("hidden");
      continueBtnContainer.classList.remove("hidden");
      winDisplayContainer.classList.remove("hidden");
      if (
        (player.wager % 2 === 0 && call === "even") ||
        (player.wager % 2 !== 0 && call === "odd")
      ) {
        winDisplay.innerText = "CPU wins!";
        cpu.score += cpu.wager;
        player.score -= cpu.wager;
        if (cpu.score >= 20) {
          player.score = 0;
          cpu.score = 20;
          continueBtn.innerHTML = "Reset";
        }
      } else {
        winDisplay.innerText = "Player wins!";
        cpu.score -= cpu.wager;
        player.score += cpu.wager;
        if (player.score >= 20) {
          player.score = 20;
          cpu.score = 0;
          continueBtn.innerHTML = "Reset";
        }
      }
      callDisplay.innerText = `CPU called ${call}`;
      player.scoreDisplay.innerText = player.score;
      cpu.scoreDisplay.innerText = cpu.score;
      isPlayersTurn = true;
    } else {
      callDisplay.innerText = "Please place a valid wager!";
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

    callDisplay.innerText = "Place a wager and make a call!";
  }
  player.wagerDisplay.innerText = 0;
  cpu.wagerDisplay.innerText = 0;

  continueBtnContainer.classList.add("hidden");
  winDisplayContainer.classList.add("hidden");
});
