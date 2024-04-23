const CHOICES = {
    "rock" : 0,
    "paper" : 1,
    "scissors" : 2
};

const numCHOICES = {
    0 : "Rock",
    1 : "Paper",
    2 : "Scissors"
};

const SCORETOWIN = 3;


let humanScore = 0;
let computerScore = 0;

const buttonContainer = document.querySelector(".container");
const roundOutbox = document.querySelector(".round-out");
const scoreOutbox = document.querySelector(".score-out");
const resetButton = document.createElement("button");
resetButton.classList.add("reset");

resetButton.addEventListener("click",() => {
    resetScores();
    hideReset();
    showButtons();
    
});

scoreOutbox.textContent="0-0";
resetButton.textContent="Start New Game";
hideReset();

document.body.appendChild(resetButton);

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice(choice) { //switched from prompt to allow for buttons function
    return CHOICES[choice.toLowerCase()];
}

function calcWinner(humanChoice, computerChoice) {  // Extracted from playRound for readability 
    if(humanChoice===computerChoice) return 0;

    switch(humanChoice) {
    case 0: return computerChoice === 1 ? -1 : 1;
    case 1: return computerChoice === 2 ? -1 : 1;
    case 2: return computerChoice === 0 ? -1 : 1;
    }
}

function playRound(humanChoice, computerChoice) {  
    switch(calcWinner(humanChoice, computerChoice))  {
    case -1: {
        computerScore++;
        return `You lose! ${numCHOICES[humanChoice]} loses to ${numCHOICES[computerChoice]} `; 
    }
    case 0: {
        return "It's a tie!";
    }
    case 1: {
        humanScore++;
        return `You win! ${numCHOICES[humanChoice]} beats ${numCHOICES[computerChoice]} `;
    }
    }
}

function resetScores(){
    humanScore = 0;
    computerScore = 0;
    updateScore();
    roundOutbox.textContent = "";
}

function alertWinner(){
    roundOutbox.textContent = (humanScore > computerScore ? `You win! ${humanScore} to ${computerScore}` : `You lost. ${humanScore} to ${computerScore}`);
}

function updateScore() {
    scoreOutbox.textContent = `${humanScore}-${computerScore}`;
}

function checkForWinner() {
    if(humanScore == SCORETOWIN || computerScore == SCORETOWIN){
        alertWinner();
        hideButtons();
    }
}

// Create the 3 choice buttons and assign ids eg "Rock-button"
for(let key in numCHOICES) {
    const button = document.createElement("button");
    const choice = numCHOICES[key].toLowerCase();
    button.textContent = choice;
    button.id = `${choice}-button`; // Assign ID based on choice

    let imglink = `./images/${choice}-button.png`;
    button.style.backgroundImage = `url(${imglink})`;
    button.style.backgroundSize = 'cover';

    buttonContainer.appendChild(button);
    button.addEventListener("click", (event) =>  {
        roundOutbox.textContent = playRound(getHumanChoice(event.target.textContent), getComputerChoice() );
        updateScore();
        checkForWinner();
    })
  
};


// Function to hide all choice buttons
function showButtons() {

    for (let key in numCHOICES) {
        const choice = numCHOICES[key].toLowerCase();
        const button = document.querySelector(`#${choice}-button`);
        button.style.display = "flex";
    }
    hideReset();
}

// Function to hide all choice buttons
function hideButtons() {
    for (let key in numCHOICES) {
        const choice = numCHOICES[key].toLowerCase();
        const button = document.querySelector(`#${choice}-button`);
        button.style.display = "none";
    }
    showReset();
}


function hideReset() {
    resetButton.style.display ="none";
}

function showReset() {
    resetButton.style.display ="block";
}
