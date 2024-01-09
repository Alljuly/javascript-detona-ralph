const state = {
  view: {
    window: document.querySelectorAll(".window"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
  },
  values: {
    nivelVelocity: 1000,
    hitPosition: null,
    count: 0,
    currentTime: 60,
    countDownTime: setInterval(setTime, 1000),
  },
};

function main() {
  moveEnemy();

  addListenerHitBox();
}

main();

function addListenerHitBox() {
  state.view.window.forEach((w) => {
    w.addEventListener("mousedown", () => {
      if (w.id === state.values.hitPosition) {
        state.values.count++;
        state.view.score.textContent = state.values.count;
        state.values.hitPosition = null;
        hitSound();
      } else {
        state.view.life.textContent--;
      }
    });
  });
}

function randomWindow() {
  state.view.window.forEach((e) => {
    e.classList.remove("enemy");
  });

  let randomSelect = Math.floor(Math.random() * 9);
  let randomWindowSelect = state.view.window[randomSelect];
  randomWindowSelect.classList.add("enemy");
  state.values.hitPosition = randomWindowSelect.id;
}

function moveEnemy() {
  state.values.timerID = setInterval(randomWindow, state.values.nivelVelocity);
}

function setTime() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime == 0 || state.view.life.innerHTML <= 0) {
    alert(`Game Over! Your Score ${state.view.score.innerHTML}`);
    resetGame();
  }
}

function resetGame() {
  state.values.currentTime = 60;
  state.view.score.innerHTML = 0;
  state.view.life.innerHTML = 5;
}

function hitSound() {
  let audio = new Audio("src/assets/sounds/hit.m4a");
  audio.play();
}
