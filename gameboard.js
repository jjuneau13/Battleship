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
            if (coord[1] + this.ships[ship].length > 10)
                throw new Error("Placed boat outside grid");
            for (
                let i = coord[1];
                i < coord[1] + this.ships[ship].length;
                i++
            ) {
                this.board[coord[0]][i] = ship;
            }
        } else {
            if (coord[0] + this.ships[ship].length > 10)
                throw new Error("Placed boat outside grid");
            for (
                let i = coord[0];
                i < coord[0] + this.ships[ship].length;
                i++
            ) {
                this.board[i][coord[1]] = ship;
            }
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
