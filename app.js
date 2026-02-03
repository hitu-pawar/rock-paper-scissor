let userScore = 0;
let compScore = 0;
const targetScore = 7;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const restartBtn = document.querySelector("#restart-btn");

const getCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIndex = Math.floor(Math.random() * 3);
  return options[randIndex];
};

const drawGame = () => {
  msg.innerText = "It's a draw! Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, compChoice, userChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  checkGameOver();
};

const checkGameOver = () => {
  if (userScore === targetScore) {
    msg.innerText = "🎉 You Won the Game!";
    disableChoices();
  } else if (compScore === targetScore) {
    msg.innerText = "💻 Computer Wins the Game!";
    disableChoices();
  }
};

const disableChoices = () => {
  choices.forEach(choice => {
    choice.removeEventListener("click", handleChoiceClick);
  });
};

const enableChoices = () => {
  choices.forEach(choice => {
    choice.addEventListener("click", handleChoiceClick);
  });
};

const handleChoiceClick = (e) => {
  const userChoice = e.currentTarget.id;
  const compChoice = getCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = false;

    if (
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ) {
      userWin = true;
    }

    showWinner(userWin, compChoice, userChoice);
  }
};

// Initialize listeners
enableChoices();

// Restart Game
restartBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play Your Move";
  msg.style.backgroundColor = "#081b31";
  enableChoices();
});