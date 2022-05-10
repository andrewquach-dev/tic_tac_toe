function TicTacToe(robotMode = true) {
    this._robotMode = robotMode;
    let turnX = true;
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    //'X', 'X', 'X'
    this.startGame = function () {
        while (!isGameSolved()) {
            displayBoard();
            if (this._robotMode === true) robotMakesMove();
            promptPlayerMove();
        }
        congratulatePlayer();
    }

    let displayBoard = function () {
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

    let isGameSolved = function () {
        return thereAreThreeInRow() || thereAreThreeInCol() || thereAreThreeDiag() ? true : false;
    }

    let thereAreThreeInRow = function () {
        for (let row of board) {
            if (row.every(mark => mark === 'X') || row.every(mark => mark === 'O')) return true;
        }
        return false;
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

    let checkRows = function () {
        for (let row of board) {
            if (row.filter(spot => spot === 'X').length === 2) return true;
        }
        return false;
    }
    let checkCols = function () {
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === 'X' && board[1][i] === 'X' || board[1][i] === 'X' && board[2][i] === 'X' || board[2][i] === 'X' && board[0][i] === 'X') {
                return true;
            }
        }
        return false;
    }
    let checkDiag = function () {
        if (board[0][0] === 'X' && board[1][1] === 'X' || board[1][1] === 'X' && board[2][2] === 'X' || board[0][0] === 'X' && board[2][2] === 'X' || board[0][2] === 'X' && board[1][1] === 'X' || board[1][1] === 'X' && board[2][0] === 'X' || board[0][2] === 'X' && board[2][0] === 'X') {
            return true;
        } else {
            return false;
        }
    }


    let congratulatePlayer = function () {
        displayBoard();
        turnX = turnX ? false : true;
        console.log(`Congrats player ${turnX ? 'X' : 'O'}!`);
    }

    let spotIsAvailable = function (coord) {
        return board[coord.split(' ')[0]][coord.split(' ')[1]] === ' ';
    }

    let placeMark = function (coord) {
        board[coord.split(' ')[0]][coord.split(' ')[1]] = turnX ? 'X' : 'O';
        turnX = turnX ? false : true;
    }


}

let xAndO = new TicTacToe();
xAndO.startGame();

//TODO turn from consolelogging program to webapp