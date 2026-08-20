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
    //placing ship and border around
    placeShip(x, y, ship, vert = false) {
        if (this.ships[ship].placed) {
            throw new Error("Already placed ship");
        }
        if (!this.checkPlacement(x, y, this.ships[ship].length, vert)) {
            throw new Error("Cannot place near other ships");
        }
        let shipLength = this.ships[ship].length;
        if (vert == false) {
            if (x + shipLength > 10)
                throw new Error("Placed boat outside grid");
            if (y - 1 >= 0) {
                this.board[y - 1][x - 1] = `${ship}M`;
            }
            this.board[y][x - 1] = `${ship}M`;
            if (y < 9) {
                this.board[y + 1][x - 1] = `${ship}M`;
            }
            for (let i = x; i < x + shipLength; i++) {
                if (y - 1 >= 0) {
                    this.board[y - 1][i] = `${ship}M`;
                }
                this.board[y][i] = ship;
                if (y < 9) {
                    this.board[y + 1][i] = `${ship}M`;
                }
            }
            if (x + shipLength <= 9) {
                if (y - 1 >= 0) {
                    this.board[y - 1][x + shipLength] = `${ship}M`;
                }
                this.board[y][x + shipLength] = `${ship}M`;
                if (y < 9) {
                    this.board[y + 1][x + shipLength] = `${ship}M`;
                }
            }
        } else {
            if (y + shipLength > 10)
                throw new Error("Placed boat outside grid");
            if (y > 0) {
                this.board[y - 1][x - 1] = `${ship}M`;
                this.board[y - 1][x] = `${ship}M`;
                if (x < 9) {
                    this.board[y - 1][x + 1] = `${ship}M`;
                }
            }
            for (let i = y; i < y + shipLength; i++) {
                this.board[i][x - 1] = `${ship}M`;
                this.board[i][x] = ship;
                if (x < 9) {
                    this.board[i][x + 1] = `${ship}M`;
                }
            }
            if (y + shipLength < 10) {
                this.board[y + shipLength][x - 1] = `${ship}M`;
                this.board[y + shipLength][x] = `${ship}M`;
                if (x < 9) {
                    this.board[y + shipLength][x + 1] = `${ship}M`;
                }
            }
        }
        this.ships[ship].placedShip();
        this.printout();
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

    checkPlacement(x, y, length, vert) {
        for (let i = 0; i < length; i++) {
            if ((!vert ? this.board[y][x + i] : this.board[y + i][x]) != 0) {
                return false;
            }
        }
        return true;
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
