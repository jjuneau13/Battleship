import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = [...new Array(10)].map(() => new Array(10).fill(0));
        this.ships = {
            A: new Ship(5),
            B: new Ship(4),
            S: new Ship(3),
            C: new Ship(3),
            D: new Ship(2),
        };
    }

    getBoard() {
        return this.board;
    }

    placeShip(coord, ship, vert = false) {
        if (vert == false) {
            if (coord[0] + this.ships[ship].length > 10)
                throw new Error("Placed boat outside grid");
            for (
                let i = coord[0];
                i < coord[0] + this.ships[ship].length;
                i++
            ) {
                this.board[coord[1]][i] = ship;
            }
        } else {
            if (coord[1] + this.ships[ship].length > 10)
                throw new Error("Placed boat outside grid");
            for (
                let i = coord[1];
                i < coord[1] + this.ships[ship].length;
                i++
            ) {
                this.board[i][coord[0]] = ship;
            }
        }
    }

    receiveAttack(x, y) {
        if (x < 0 || x > 9 || y < 0 || y > 9) {
            throw new Error("Cannot attack outside grid");
        }
        if (this.board[y][x] == "X" || this.board[y][x] == "M") {
            throw new Error("Already attacked this tile");
        }
        if (this.board[y][x] == 0) {
            this.board[y][x] = "M";
            return "Miss";
        } else {
            this.ships[this.board[y][x]].hit();
            this.board[y][x] = "X";
            return "Hit!";
        }
    }

    printout() {
        for (let row of this.board) {
            console.log(...row);
        }
    }

    reset() {
        this.board = [...new Array(10)].map(() => new Array(10).fill(0));
    }
}
