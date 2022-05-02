function TicTacToe(playAgainstBot = true) {
    this.playAgainstBot = playAgainstBot;
    let turnX = true;
    let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    //'X', 'X', 'X'
    this.startGame = function () {
        while (!isGameSolved()) {
            displayBoard();
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
        return threeInRow() || threeInCol() || threeDiag() ? true : false;
    }

    let threeInRow = function () {
        for (let row of board) {
            if (row.every(mark => mark === 'X') || row.every(mark => mark === 'O')) return true;
        }
        return false;
    }

    let threeInCol = function () {
        for (let i = 0; i < 3; i++) {
            if ((board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X') || (board[0][i] === 'O' && board[1][i] === 'O' && board[2][i] === 'O')) {
                return true;
            }
        }
        return false;
    }

    let threeDiag = function () {
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

    let congratulatePlayer = function () {
        displayBoard();
        turnX = turnX ? false : true;
        console.log(`Congrats player ${turnX ? 'X' : 'O'}`);
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
