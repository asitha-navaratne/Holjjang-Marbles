const callDisplay = document.getElementById("display-call");
const selectWager = document.getElementById("select-wager");
const selectCall = document.getElementById("select-call");
const selectCallContainer = document.getElementById("select-call-container");
const playerControls = document.getElementById("player-controls-container");
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const continueBtn = document.getElementById("continue-btn");
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
      if (
        (cpu.wager % 2 === 0 && call === "even") ||
        (cpu.wager % 2 !== 0 && call === "odd")
      ) {
        callDisplay.innerText = "Player wins!";
        player.score += player.wager;
        cpu.score -= player.wager;
      } else {
        callDisplay.innerText = "CPU wins!";
        player.score -= player.wager;
        cpu.score += cpu.wager;
      }
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
      if (
        (player.wager % 2 === 0 && call === "even") ||
        (player.wager % 2 !== 0 && call === "odd")
      ) {
        callDisplay.innerText = "CPU wins!";
        cpu.score += cpu.wager;
        player.score -= cpu.wager;
      } else {
        callDisplay.innerText = "Player wins!";
        cpu.score -= cpu.wager;
        player.score += cpu.wager;
        player.scoreDisplay.innerText = player.score;
        cpu.scoreDisplay.innerText = cpu.score;
        isPlayersTurn = true;
      }
    } else {
      callDisplay.innerText = "Please place a valid wager!";
    }
  }
});

continueBtn.addEventListener("click", function () {
  callDisplay.innerText = "Place a wager and make a call!";
  isWagerValid = false;
  selectCall.value = "";
  selectWager.value = "";
  player.wagerDisplay.innerText = 0;
  cpu.wagerDisplay.innerText = 0;
  if (!isPlayersTurn) {
    selectCallContainer.classList.add("hidden");
    isCallValid = true;
  } else {
    selectCallContainer.classList.remove("hidden");
    isCallValid = false;
  }
  playerControls.classList.remove("hidden");
  continueBtnContainer.classList.add("hidden");
});

resetBtn.addEventListener("click", function () {});
