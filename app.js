let winnMsg = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newBtn = document.querySelector("#new-button");
let buttons = document.querySelectorAll(".button1");
let restBtn = document.querySelector("#reset-button");

let turnO = true; 

let count = 0;  // To track Draw!

const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

buttons.forEach((box) => {
    // Alternatively fill O & X one by one
    box.addEventListener("click", () => { 
        if(turnO){
            box.innerText = "O"; 
            box.style.color = "#00bf72";
            turnO = false; // After set one button is O then next one should be x
        }
        else{
            box.innerText = "X";
            box.style.color = "#1b2261";
            turnO = true; // After set one button is X then next one should be O again
        }
        box.disabled = true; // After one button was clicked, disabled this button.

        count++;
        
        let isWin = winnerCheck();

        if(count === 9 && !isWin){
            drawMsg();
        }
    })
});

const drawMsg = () => {
    msg.innerHTML = `Game was a DRAW!!`;
    winnMsg.classList.remove("hide");
    disableButton();
}

// Functions that disabled all buttons after displaying 1 winner
const disableButton = () => {  
    for(let button of buttons){
        button.disabled = true;
    }
}

// Functions that enabled all buttons
const enableButton = () => {  
    for(let button of buttons){
        button.disabled = false;
        button.innerHTML = ""; // Remove the all innerText element after reset.
    }
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableButton();
    winnMsg.classList.add("hide");
}

// Display the winner message section
const displayWinner = (winner) => {  
    msg.innerHTML = `Congratulations!! Winner is: ${winner}`;
    winnMsg.classList.remove("hide");
    disableButton();
}

const winnerCheck = () => {
    
    for(let pattern of patterns){      
        //patterns array with it's connected buttons inside text store in three variable for three index
        let pos1 = buttons[pattern[0]].innerText; 
        let pos2 = buttons[pattern[1]].innerText;
        let pos3 = buttons[pattern[2]].innerText;

        // Checking the all three values of one parter should be full.
        if(pos1 != "" && pos2 != "" && pos3 != ""){ 
            // Check that all three buttons inside element are same or not 
            if(pos1 === pos2 && pos2 === pos3){ 
                displayWinner(pos1);
            }

        }

    }
};

newBtn.addEventListener("click", resetGame);
restBtn.addEventListener("click", resetGame);