const boxs = document.querySelectorAll('.box');
const statustxt = document.querySelector('#status');
const btn = document.querySelector('#reset');

let o = "O";
let x = "X";


const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let running = false;

init();

function init() {
    boxs.forEach(box => box.addEventListener('click', boxClick));
    btn.addEventListener('click', reset);
    statustxt.textContent = `${player} your turn`;
    running = true;
}

function boxClick() {
    const index = this.dataset.index;

    if (options[index] !== "" || !running) {
        return;
    }

    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.textContent = currentPlayer;
    box.classList.remove('x', 'o');
    if (currentPlayer === "X") {
        box.classList.add('x'); // Add class for X
    } else {
        box.classList.add('o'); // Add class for O
    }
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
    currentPlayer = (currentPlayer === x) ? o : x;
    statustxt.textContent = `${player} your turn`;
}

function checkWinner() {
    let isWon = false;
    for (let i = 0; i < wins.length; i++) {
        const condition = wins[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];

        if (box1 === "" || box2 === "" || box3 === "") {
            continue;
        }

        if (box1 === box2 && box2 === box3) {
            isWon = true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
        }
    }

    if (isWon) {
        statustxt.textContent = `${player} won!`;
        running = false;
    } else if (!options.includes("")) {
        statustxt.textContent = "Match draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function reset() {
    options = ["", "", "", "", "", "", "", "", ""];
    boxs.forEach(box => {
        box.textContent = "";
        box.classList.remove('win');
    });
    player = "X";
    currentPlayer = x;
    statustxt.textContent = `${player} your turn`;
    running = true;
    

}
