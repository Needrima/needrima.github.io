document.querySelector('#start').addEventListener('click', reset);

let winPosition = [
    ["r-1c-1", "r-1c-2", "r-1c-3"],
    ["r-2c-1", "r-2c-2", "r-2c-3"],
    ["r-3c-1", "r-3c-2", "r-3c-3"],
    ["r-1c-1", "r-2c-1", "r-3c-1"],
    ["r-1c-2", "r-2c-2", "r-3c-2"],
    ["r-1c-3", "r-2c-3", "r-3c-3"],
    ["r-1c-1", "r-2c-2", "r-3c-3"],
    ["r-1c-3", "r-2c-2", "r-3c-1"],
]
//global variables
let cellCount = 9;

let current = 'x';

let xPositions = [];

let oPositions = [];

let xScore = 0;

let oScore = 0;

function playHere(clickedCell) {
    if (cellIsNotTaken(clickedCell.id)) {
        play(clickedCell.id);
    }

    if (Draw()) {
        alert('Draw');
        console.log('Draw');
        reset();
    }
}

function play(clickedCellId) {
    if (current === 'x') {
        document.querySelector(`#${clickedCellId}`).textContent = 'x';
        current = 'o';
        xPositions.push(clickedCellId);
        cellCount--;
    } else if (current === 'o') {
        document.querySelector(`#${clickedCellId}`).textContent = 'o';
        current = 'x';
        oPositions.push(clickedCellId);
        cellCount--;
    } 

    winner = getWinner();

    if (winner == 'x') {
        
        xScore++;
        document.querySelector('#x-score').textContent = xScore;
        alert('x wins');
        reset();

    }else if (winner == 'o') {
       
        oScore++;
        document.querySelector('#o-score').textContent = oScore;
        alert('o wins');
        reset();
    }
}

function reset() {
    let cells = document.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = ''
    }

    current = 'x';
    xPositions = [];
    oPositions = [];
    cellCount = 9;
}

function cellIsNotTaken(id) {
    return document.querySelector(`#${id}`).textContent === ''
}

function Found(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }

    return false
}

function getWinner() {
    let xInWinPosition = 0;
    let oInWinsPosition = 0;
    let winner;
    for (let i = 0; i < winPosition.length; i++) {

        for (let j = 0; j < xPositions.length; j++) {
            if (Found(winPosition[i], xPositions[j])) {
                xInWinPosition++;
            }
        }

        if (xInWinPosition < 3) {
            xInWinPosition = 0;
        }else {
            winner = 'x'
        }

        for (let k = 0; k < oPositions.length; k++) {
            if (Found(winPosition[i], oPositions[k])) {
                oInWinsPosition++;
            }
        }

        if (oInWinsPosition < 3) {
            oInWinsPosition = 0;
        }else {
            winner = 'o'
        }
    }

    return winner;
}

function Draw() {
    return cellCount === 0;
}