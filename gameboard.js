import { Ship } from "./ship.js";

export class Gameboard {
    constructor() {
        this.board = [...new Array(10)].map(() => new Array(10).fill(0));
        this.aircraft_Carrier = new Ship("A", 5);
        this.battleship = new Ship("B", 4);
        this.submarine = new Ship("S", 3);
        this.cruiser = new Ship("C", 3);
        this.destroyer = new Ship("D", 2);
    }

    getBoard() {
        return this.board;
    }

    placeShip(coord, len, dir) {
        this.board[coord[0]][coord[1]] = this.ba;
    }

    printout() {
        for (let row of this.board) {
            console.log(...row);
        }
    }
}

let shipboard = new Gameboard();

shipboard.printout();
