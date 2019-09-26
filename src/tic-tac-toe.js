'use strict'

class Cell {
    constructor() {
        this.val = null;
    }

    setVal(value) {
        this.val = value;
    }

    getVal() {
        return this.val;
    }
}

class Board {
    constructor(size) {
        this.dim = size;

        this.grid = new Array(size);

        for (let i = 0; i < size; i++) {
            this.grid[i] = new Array(size);
        }

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                  this.grid[i][j] = new Cell();
            }
        }
    }

    getFieldValue(rowIndex, colIndex) {
        return this.grid[rowIndex][colIndex].getVal();
    }

    setFieldValue(rowIndex, colIndex, value) {
        if ((rowIndex < 0) || (rowIndex > this.dim - 1) || (colIndex < 0) || (colIndex > this.dim - 1)) {
            return;
        }

        this.grid[rowIndex][colIndex].setVal(value);
    } 

    isFull() {
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                if (!this.grid[i][j].getVal()) {
                    return false;
                }
            }
        }
        return true;
    }
}

class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }

    setSymbol(value) {
        this.symbol = value;
    }

    getSymbol() {
        return this.symbol;
    }
}

var gameDim = 3;
var firstPlayerSymbol = "x";
var secondPlayerSymbol = "o";

class TicTacToe {
    constructor() {
        this.board = new Board(gameDim);
        this.players = [
          new Player(firstPlayerSymbol),
          new Player(secondPlayerSymbol)
        ];
        this.currPlayer = this.players[0];
        this.winner = null;
        this.is_draw = false;
    }

    getCurrentPlayerSymbol() {
        return this.currPlayer.getSymbol();
    }

    nextTurn(rowIndex, columnIndex) {
        if ((this.board.getFieldValue(rowIndex, columnIndex)) || (this.winner)) {
            return;
        }

        this.board.setFieldValue(rowIndex, columnIndex, this.currPlayer.getSymbol());

        let prevPlayer = this.currPlayer;
        this.currPlayer = (this.currPlayer === this.players[0]) ? this.players[1] : this.players[0];

        let tmp = this.board.getFieldValue(rowIndex, 0);
        let count;

        if (tmp) {
            count = 1;

            for (let i = 1; i < gameDim; i++) {
                let next = this.board.getFieldValue(rowIndex, i);

                if ((next === null) || (next !== tmp)) {
                    break;
                }
                count++;
            }

            if (count === gameDim) {
                this.winner = prevPlayer;
                return;
            }
        }

        tmp = this.board.getFieldValue(0, columnIndex);

        if (tmp) {
            count = 1;
         
            for (let i = 1; i < gameDim; i++) {
                let next = this.board.getFieldValue(i, columnIndex);

                if ((next === null) || (next !== tmp)) {
                    break;
                }
                count++;
            }

            if (count === gameDim) {
                this.winner = prevPlayer;
                return;
            }
        }

        if (rowIndex === columnIndex) {
            tmp = this.board.getFieldValue(0, 0);

            if (tmp) {
                count = 1;

                for (let i = 1; i < gameDim; i++) {
                    let next = this.board.getFieldValue(i, i);

                    if ((next === null) || (next !== tmp)) {
                        break;
                    }
                    count++;
                }

                if (count === gameDim) {
                    this.winner = prevPlayer;
                    return;
                }
            }
            
        } 

        if (rowIndex + columnIndex === gameDim - 1) {
            tmp = this.board.getFieldValue(0, gameDim - 1);

            if (tmp) {
                count = 1;

                for (let i = 1; i < gameDim; i++) {
                    let next = this.board.getFieldValue(i, gameDim-1-i);

                    if ((next === null) || (next !== tmp)) {
                        break;
                    }
                    count++;
                }

                if (count === gameDim) {
                    this.winner = prevPlayer;
                    return;
                }
            }
        }

        if (this.noMoreTurns()) {
            this.is_draw = true;
        }
    }

    isFinished() {
       return ((this.winner) || (this.is_draw)) ? true : false;
    }

    getWinner() {
        return (this.winner) ? this.winner.getSymbol() : null;
    }

    noMoreTurns() {
        return this.board.isFull();
    }

    isDraw() {
        return this.is_draw;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.board.getFieldValue(rowIndex, colIndex);
    }
}

module.exports = TicTacToe;
