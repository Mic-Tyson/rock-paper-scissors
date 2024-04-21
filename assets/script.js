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

function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getHumanChoice() {
    return CHOICES[prompt("Rock, Paper, Scissors!").toLowerCase()];
}

function calcWinner(humanChoice, computerChoice) {  // Extracted from playRound for readability 
    if(humanChoice===computerChoice) return 0;

    switch(humanChoice) {
    case 0: return computerChoice === 1 ? -1 : 1;
    case 1: return computerChoice === 2 ? -1 : 1;
    case 2: return computerChoice === 0 ? -1 : 1;
    }
}

function playGame(){

    let humanScore = 0;
    let computerScore = 0;

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

    for(let i = 0; i<5; ++i) playRound(getHumanChoice(), getComputerChoice());

    prompt(humanScore > computerScore ? `You win! ${humanScore} to ${computerScore}` : `You lost. ${humanScore} to ${computerScore}`);
}

playGame();