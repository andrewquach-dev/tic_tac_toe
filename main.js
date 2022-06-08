function TicTacToe(againstRobot = true) {

    this._againstRobot = againstRobot;
    let turnX = true;
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    let isOver = false;

    //Retired, used when game was console
    this.startGame = function () {
        while (!isOver) {
            if (this._againstRobot === true) robotMakesMove();
            displayBoard();
            promptPlayerMove();
            displayBoard();
        }
    }

    this.getTurn = () => turnX ? 'X' : 'O';


    this.changeTurn = () => turnX = turnX ? false : true;


    this.isGameOver = () => isOver ? true : false;


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
    }

    this.reset = () => {
        board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
        isOver = false;
    }

    this.isOutcomeDraw = function () {
        return !theresThreeSameOfAnyKind() && isDraw();
    }

    this.isWinnerX = function () {
        turnX = turnX === true ? false : true;
        return turnX;
    }

    function check() {
        if (theresThreeSameOfAnyKind()) {
            isOver = true;
        } else if (isDraw()) {
            isOver = true;
        } else {
            console.log('game not done yet...')
        }
    }

    //Retired, used when game was console
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

    let theresThreeSameOfAnyKind = function () {
        return thereAreThreeInRow() === true || thereAreThreeInCol() === true || thereAreThreeDiag() === true ? true : false;
    }
    let isDraw = function () {
        return board.every(row => row.every(ele => ele !== '')) ? true : false;
    }

    let thereAreThreeInRow = function () {
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

    //Retired, used when game was console
    let promptPlayerMove = function () {
        let coord;
        while (true) {
            coord = prompt("Make a move: ");
            if (spotIsAvailable(coord)) break;
        }
        placeMark(coord);

    }

    //Retired, used when game was console
    let spotIsAvailable = function (coord) {
        return board[coord.split(' ')[0]][coord.split(' ')[1]] === ' ';
    }

    //Retired, used when game was console
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

    //Retired, used when game was console
    let congratulatePlayer = function () {
        turnX = turnX === true ? false : true;
        console.log(`Congrats player ${turnX ? 'X' : 'O'}!`);

        displayBoard();
    }

    //Retired, used when game was console
    let placeMark = function (coord) {
        board[coord.split(' ')[0]][coord.split(' ')[1]] = turnX ? 'X' : 'O';
        turnX = turnX === true ? false : true;
        check();
    }

}

const game = new TicTacToe();
//Below is for console version
// xAndO.startGame();
const gridBoxes = document.getElementsByTagName('td');
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


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
        if (event.target.innerHTML === '' && !game.isGameOver()) {
            event.target.innerHTML = game.getTurn();
            game.updateArrays(document.getElementById('grid'));
            game.changeTurn();
            if (game.isGameOver()) {
                updateModalWithOutcome();
                openModal();
            }
        }
    });
}

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
        game.reset();
        clearBoard();
    })
})

function getGameOutcome() {
    if (game.isOutcomeDraw()) {
        return 'Draw...'
    } else if (game.isWinnerX()) {
        return 'Congrats X';
    } else {
        return 'Congrats O';
    }
}


function clearBoard() {
    for (let box of gridBoxes) {
        box.innerText = "";
    }
}

function updateModalWithOutcome() {
    let h2 = document.querySelector('.modal-h2');
    h2.innerText = getGameOutcome();
}

function openModal() {
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//TODO make it look better and behave smoother (a lil clunky)
//https://codepen.io/jh3y/pen/KKNwpzN
//TODO robot mode(if unchecked then against human) checkbox