let counter = 0;
let wins = 0;
let losses = 0;
let mode = "classic";
let gameOver = false;

/* ---------- Screens ---------- */

// Show one screen and hide the others
function showScreen(id) {
    const screens = document.querySelectorAll(".screen");
    for (let i = 0; i < screens.length; i++) {
        screens[i].classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
}

// Start a new game in "classic" or "spock" mode
function startGame(chosenMode) {
    mode = chosenMode;
    counter = 0;
    wins = 0;
    losses = 0;
    gameOver = false;

    if (mode === "classic") {
        document.getElementById("modeTitle").textContent = "Rock Paper Scissors";
        document.getElementById("spockOptions").style.display = "none";
    } else {
        document.getElementById("modeTitle").textContent = "Rock Paper Scissors Lizard Spock";
        document.getElementById("spockOptions").style.display = "block";
    }

    // Clear the form and the old results
    document.querySelector("form").reset();
    document.getElementById("choice").textContent = "";
    document.getElementById("compChoice").textContent = "";
    document.getElementById("result").textContent = "Pick a move and press Click!";
    document.getElementById("counter").textContent = "";
    updateScore();

    showScreen("game");
}

/* ---------- Game ---------- */

function rockPaperScissors() {

    const ROCK = document.getElementById("rock").checked;
    const PAPER = document.getElementById("paper").checked;
    const SCISSORS = document.getElementById("scissors").checked;
    const LIZARD = document.getElementById("lizard").checked;
    const SPOCK = document.getElementById("spock").checked;
    const resultBox = document.getElementById("result");

    if (gameOver) {
        resultBox.textContent = "Game over! Go Back and start a new game.";
        return;
    }

    let userChoice;

    if (ROCK) {
        userChoice = "Rock";
    } else if (PAPER) {
        userChoice = "Paper";
    } else if (SCISSORS) {
        userChoice = "Scissors";
    } else if (LIZARD) {
        userChoice = "Lizard";
    } else if (SPOCK) {
        userChoice = "Spock";
    } else {
        userChoice = "None";
    }

    if (userChoice === "None") {
        resultBox.textContent = "Please select an option.";
        return;
    }

    let computerChoices;
    if (mode === "classic") {
        computerChoices = ["Rock", "Paper", "Scissors"];
    } else {
        computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
    }

    let computerNumber = Math.floor(Math.random() * computerChoices.length);
    let computerChoice = computerChoices[computerNumber];
    document.getElementById("choice").textContent = getName() + " chose: " + userChoice;
    document.getElementById("compChoice").textContent = "Computer chose: " + computerChoice;

    if (userChoice === computerChoice) {
        resultBox.textContent = "It's a tie!";
    } else if (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Rock" && computerChoice === "Lizard") ||
        (userChoice === "Paper" && computerChoice === "Rock") ||
        (userChoice === "Paper" && computerChoice === "Spock") ||
        (userChoice === "Scissors" && computerChoice === "Paper") ||
        (userChoice === "Scissors" && computerChoice === "Lizard") ||
        (userChoice === "Lizard" && computerChoice === "Spock") ||
        (userChoice === "Lizard" && computerChoice === "Paper") ||
        (userChoice === "Spock" && computerChoice === "Scissors") ||
        (userChoice === "Spock" && computerChoice === "Rock")
    ) {
        resultBox.textContent = "You win!";
        wins++;
    } else {
        resultBox.textContent = "You lose!";
        losses++;
    }

    counter++;
    document.getElementById("counter").textContent = "Rounds played: " + counter;
    updateScore();
    checkWinner();
}

/* ---------- Helpers ---------- */

function updateScore() {
    document.getElementById("score").textContent =
        getName() + " " + wins + " - " + losses + " Computer";
}

// Stop the game when someone reaches the "First to" number in Settings
function checkWinner() {
    const targetInput = document.getElementById("winTarget");
    const target = Number(targetInput.value);
    if (!Number.isInteger(target) || target < 1 || target > 10) {
        targetInput.value = "3";
    }
    const isValidTarget = Number.isInteger(target) && target >= 1 && target <= 10;
    const winTarget = isValidTarget ? target : 3;

    if (wins >= winTarget) {
        document.getElementById("result").textContent = "🏆 " + getName() + " wins the duel!";
        gameOver = true;
    } else if (losses >= winTarget) {
        document.getElementById("result").textContent = "🛸 The Computer wins the duel!";
        gameOver = true;
    }
}

function getName() {
    let name = document.getElementById("playerName").value.trim();
    if (name === "") {
        name = "You";
    }
    return name;
}