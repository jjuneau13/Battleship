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
            if (coord[1] - 1 >= 0) {
                this.board[coord[1] - 1][coord[0] - 1] = `${ship}M`;
            }
            this.board[coord[1]][coord[0] - 1] = `${ship}M`;
            if (coord[1] < 9) {
                this.board[coord[1] + 1][coord[0] - 1] = `${ship}M`;
            }
            for (
                let i = coord[0];
                i < coord[0] + this.ships[ship].length;
                i++
            ) {
                if (coord[1] - 1 >= 0) {
                    this.board[coord[1] - 1][i] = `${ship}M`;
                }
                this.board[coord[1]][i] = ship;
                if (coord[1] < 9) {
                    this.board[coord[1] + 1][i] = `${ship}M`;
                }
            }
            if (coord[0] + this.ships[ship].length <= 9) {
                if (coord[1] - 1 >= 0) {
                    this.board[coord[1] - 1][
                        coord[0] + this.ships[ship].length
                    ] = `${ship}M`;
                }
                this.board[coord[1]][coord[0] + this.ships[ship].length] =
                    `${ship}M`;
                if (coord[1] < 9) {
                    this.board[coord[1] + 1][
                        coord[0] + this.ships[ship].length
                    ] = `${ship}M`;
                }
            }
        } else {
            if (coord[1] + this.ships[ship].length > 10)
                throw new Error("Placed boat outside grid");
            if (coord[1] > 1) {
                if (this.board[coord[1] - 1][coord[0] - 1]) {
                    this.board[coord[1] - 1][coord[0] - 1] = `${ship}M`;
                }
            }
            for (
                let i = coord[1];
                i < coord[1] + this.ships[ship].length;
                i++
            ) {
                this.board[i][coord[0]] = ship;
            }
        }
    }

    getShips() {
        return Object.keys(this.ships);
    }

    allSunk() {
        for (let ship of Object.values(this.ships)) {
            if (ship.sunk == false) return false;
        }
        return true;
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
            return "M";
        } else {
            this.ships[this.board[y][x]].hit();
            if (this.ships[this.board[y][x]].sunk) this.board[y][x] = "X";
            return "H";
        }
    }

    printout() {
        for (let row of this.board) {
            console.log(...row);
        }
    }

    reset() {
        this.board = [...new Array(10)].map(() => new Array(10).fill(0));
        this.ships = {
            A: new Ship(5),
            B: new Ship(4),
            S: new Ship(3),
            C: new Ship(3),
            D: new Ship(2),
        };
    }
}
