

function TicTacToe(againstRobot = true) {

    this._againstRobot = againstRobot;
    let turnX = true;
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    let isOver = false;

    this.startGame = function () {
        while (!isOver) {
            if (this._againstRobot === true) robotMakesMove();
            displayBoard();
            promptPlayerMove();
            displayBoard();
        }
    }

    this.getTurn = function () {
        return turnX ? 'X' : 'O';
    }

    this.changeTurn = function () {
        turnX = turnX === true ? false : true;
    }

    this.isGameOver = function () {
        return isOver === true ? true : false;
    }

    this.updateArrays = function (table) {
        let result = []
        let rows = table.rows;
        let cells, t;

        // Iterate over rows
        for (let i = 0, iLen = rows.length; i < iLen; i++) {
            cells = rows[i].cells;
            t = [];

            // Iterate over cells
            for (let j = 0, jLen = cells.length; j < jLen; j++) {
                t.push(cells[j].textContent);
            }
            result.push(t);
        }
        board = result;
        check();
        console.log(board);
    }

    function isGameOver(){
        return isOver;
    }

    function check() {
        if (theresThree()) {
            isOver = true;
        } else if (isDraw()) {
            isOver = true;
            console.log("It's a draw.");
        } else {
            console.log('game not done yet...')
        }
    }


    function displayBoard() {
        let boardString = "";

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (j !== 2) {
                    boardString += ' ' + board[i][j] + ' |';
                } else {
                    boardString += ' ' + board[i][j] + ' \n';
                }
            }
            if (i !== 2) {

                boardString += '---+---+---\n'
            }
        }
        console.log(boardString)
    }

    let theresThree = function () {
        return thereAreThreeInRow() === true || thereAreThreeInCol() === true || thereAreThreeDiag() === true ? true : false;
    }
    let isDraw = function () {
        return board.every(row => row.every(ele => ele !== '')) ? true : false;
    }

    let thereAreThreeInRow = function () {
        // for (let row of board) {
        //     if (row.every(mark => mark === 'X') || row.every(mark => mark === 'O')) return true;
        // }
        // return false;
        return board.some(row => row.every(ele => ele === 'X') || row.every(ele => ele === 'O'));
    }

    let thereAreThreeInCol = function () {
        for (let i = 0; i < 3; i++) {
            if ((board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X') || (board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O')) {
                return true;
            }
        }
        return false;
    }

    let thereAreThreeDiag = function () {
        if ((board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') || (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') || (board[0][2] === 'X' && board[1][1] === 'X' && board[2][0] === 'X') || (board[0][2] === 'O' && board[1][1] === 'O' && board[2][0] === 'O')) {
            return true;
        } else {
            return false;
        }
    }

    let promptPlayerMove = function () {
        let coord;
        while (true) {
            coord = prompt("Make a move: ");
            if (spotIsAvailable(coord)) break;
        }
        placeMark(coord);
    }

    let robotMakesMove = function () {
        let coords;
        while (true) {
            coords = [Math.floor((Math.random() * 3)), Math.floor((Math.random() * 3))];
            if (board[coords[0]][coords[1]] === ' ') {
                placeMark(coords.join(' '));
                break;
            }
        }
    }


    this.congratulatePlayer = function () {
        turnX = turnX === true ? false : true;
        console.log(`Congrats player ${turnX ? 'X' : 'O'}!`);

        displayBoard();
    }

    let spotIsAvailable = function (coord) {
        return board[coord.split(' ')[0]][coord.split(' ')[1]] === ' ';
    }

    let placeMark = function (coord) {
        board[coord.split(' ')[0]][coord.split(' ')[1]] = turnX ? 'X' : 'O';
        turnX = turnX === true ? false : true;
        check();
    }

}

let game = new TicTacToe();
// xAndO.startGame();
//TODO make gui
let gridBoxes = document.getElementsByTagName('td');

for (let box of gridBoxes) {
    box.addEventListener("mouseover", function (event) {
        if (event.target.innerHTML === "" && !game.isGameOver()) {
            event.target.innerHTML = game.getTurn();
            setTimeout(function () {
                event.target.innerText = "";
            }, 500);
        }
    });

    box.addEventListener("click", function (event) {
        if (event.target.innerHTML === ''&& !game.isGameOver()) {
            event.target.innerHTML = game.getTurn();
            game.updateArrays(document.getElementById('grid'));
            game.changeTurn();
            if (game.isGameOver()) {
                game.congratulatePlayer();
                openModal();
            }
        }
    });
}
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')



overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal() {
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//TODO when clicking change to X
//when we click a box get shape and change to that shape
//update the 2darray
//check if game is solved
//if it's solved prevent from clicking and congratulate
//if its not solved then robot will make move

//TODO Replay button

//TODO robot mode(if unchecked then against human) checkbox