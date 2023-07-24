const gameInfo = document.querySelector('.game-info');
const boxes =  document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Lets create a intiasle function

function initGame(){
    gameGrid = ["","","","","","","","",""];
    currentPlayer = 'X';
    // newGameBtn.classList.remove('active');

    gameInfo.innerText = `Current PLayer  ${currentPlayer}`;

    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents= "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove('active');

}


initGame();

function swapTurn() {
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }

    else
        currentPlayer = 'X';

    // UI Update 
    gameInfo.innerText = `Current PLayer  ${currentPlayer}`; 
}


function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        
        // Swap karo turn ko
        swapTurn();
        // Check karo koi jeet toh nhi gya
        checkGameOver();
    }
}

function checkGameOver(){
    let answer = "";

   winningPositions.forEach((position)=>{
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
       && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

        // Check If winner is X or O
        if(gameGrid[position[0]] === 'X'){
            answer = "X"
            console.log('x is winner');
        }
        else {
            answer = "O"
        }

        
        //disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
        })

        // now we know X/O is the winner
        boxes[position[0]].classList.add('win');
        boxes[position[1]].classList.add('win');
        boxes[position[2]].classList.add('win');
       }
       
   });

    //    It means we have a winner
   if(answer !== ""){
        gameInfo.innerText = `Winner Player  ${answer}`;
        newGameBtn.classList.add('active');
   }

//    We know, No winner found, lets check if there is tie

let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener('click',initGame);