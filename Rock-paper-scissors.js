let Score = JSON.parse(localStorage.getItem("Score")) || {
  wins: 0,
  losses: 0,
  tie: 0,
};
updateScore();

function playgame(playerMove) {
  let result = "";

  const computerMove = pickcomputermove();

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Win.";
    } else if (computerMove === "Paper") {
      result = "You Lose.";
    }

    //alert(`you picked ${playerMove}, Computer Picked ${computerMove} ${result}`);
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Lose.";
    } else if (computerMove === "Rock") {
      result = "You Win.";
    }
  } else {
    if (computerMove === "Scissors") {
      result = "Tie.";
    } else if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "You Win.";
    }
  }

  //   alert(`you picked ${playerMove}, Computer Picked ${computerMove} ${result} `);

  if (result === "You Win.") {
    Score.wins += 1;
  } else if (result === "You Lose.") {
    Score.losses += 1;
  } else if (result === "Tie.") {
    Score.tie += 1;
  }

  localStorage.setItem("Score", JSON.stringify(Score));

  alert(`you picked ${playerMove}, Computer Picked ${computerMove} ${result}
Wins:${Score.wins}, Losses:${Score.losses},Tie:${Score.tie}`);

  document.querySelector(".res-game").innerHTML = ` ${result}`;
  document.querySelector(
    ".move"
  ).innerHTML = ` You <img src="${playerMove}.png"  class="rock-image">
<img src="${computerMove}.png"  class="rock-image"> Computer`;
  updateScore();
}
let isAutoPlay = false;
let valId;
function autoplay() {
  if (!isAutoPlay) {
    valId = setInterval(() => {
      const playerMove = pickcomputermove();
      playgame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else {
    clearInterval(valId);
    isAutoPlay = false;
  }
}

function pickcomputermove() {
  const random = Math.random();

  if (random >= 0 && random < 1 / 3) {
    computerMove = "Rock";
  } else if (random >= 1 / 3 && random < 2 / 3) {
    computerMove = "Paper";
  } else if (random >= 2 / 3 && random < 1) {
    computerMove = "Scissors";
  }

  console.log(computerMove);

  return computerMove;
}
function updateScore() {
  document.querySelector(
    ".score-card"
  ).innerHTML = `Wins:${Score.wins}, Losses:${Score.losses},Tie:${Score.tie}`;
}

const reset = document.querySelector(".reset-button");

const resetfun = () => {
  Score.wins = 0;
  Score.losses = 0;
  Score.tie = 0;
  localStorage.removeItem("Score");
  updateScore();
};
reset.addEventListener("click", resetfun);
document.querySelector(".buttons-rock").addEventListener(
  "click",

  () => {
    playgame("Rock");
  }
);
document.querySelector(".buttons-scissors").addEventListener(
  "click",

  () => {
    playgame("Scissors");
  }
);
document.querySelector(".buttons-paper").addEventListener(
  "click",

  () => {
    playgame("Paper");
  }
);

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playgame("Rock");
  } else if (event.key === "s") {
    playgame("Scissors");
  } else if (event.key === "p") {
    playgame("Paper");
  } else if (event.key === "a") {
    resetfun();
  }
});
