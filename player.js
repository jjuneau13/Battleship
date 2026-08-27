import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(cpu = false) {
        this.board = new Gameboard();
        if (cpu) {
            this.moveList = [];
            this.previousHits = [];
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    this.moveList.push(`${[x, y]}`);
                }
            }
            this.#placeCPUShips();
        }
    }

    #placeCPUShips() {
        for (let ship of this.getShips()) {
            let x = Math.floor(Math.random() * 9);
            let y = Math.floor(Math.random() * 9);
            let vert = Math.random() > 0.5;
            while (!this.validMove(x, y, ship, vert)) {
                x = Math.floor(Math.random() * 9);
                y = Math.floor(Math.random() * 9);
                vert = Math.random() > 0.5;
            }
            this.placeShip(x, y, ship, vert);
        }
    }

    placeShip(...args) {
        this.board.placeShip(...args);
    }

    receiveAttack(x, y) {
        const attack = this.board.receiveAttack(x, y);
        return { x, y, hit: attack.hit, sunk: attack.sunk };
    }

    CPUattack(attackCallback, boardCallback) {
        if (this.previousHits.length === 0) {
            let rand = Math.floor(Math.random() * this.moveList.length);
            let coord = this.moveList[rand];
            let x = parseInt(coord.at(0));
            let y = parseInt(coord.at(2));
            if (attackCallback(x, y).hit) {
                this.previousHits.push([x, y]);
            }
            this.moveList = boardCallback();
            return;
        }
        if (this.previousHits.length === 1) {
            let [x, y] = this.previousHits[0];
            if (this.moveList.includes(`${[x + 1, y]}`)) {
                x++;
            } else if (this.moveList.includes(`${[x, y + 1]}`)) {
                y++;
            } else if (this.moveList.includes(`${[x - 1, y]}`)) {
                x--;
            } else {
                y--;
            }
            let attack = attackCallback(x, y);
            if (attack.hit) {
                this.previousHits.push([x, y]);
            }
            if (attack.sunk) {
                this.previousHits = [];
            }
            this.moveList = boardCallback();
            return;
        } else {
            let [x1, y1] = this.previousHits.at(-1);
            let [x2, y2] = this.previousHits.at(-2);
            if (x1 == x2) {
                if (this.moveList.includes(`${[x1, y1 + 1]}`)) {
                    y1++;
                } else {
                    while (!this.moveList.includes(`${[x1, y1]}`)) {
                        y1--;
                    }
                }
            } else if (y1 == y2) {
                if (this.moveList.includes(`${(x1 + 1, y1)}`)) {
                    x1++;
                } else {
                    while (!this.moveList.includes(`${(x1, y1)}`)) {
                        x1--;
                    }
                }
            }
            let attack = attackCallback(x1, y1);
            if (attack.hit) {
                this.previousHits.push([x1, y1]);
            }
            if (attack.sunk) {
                this.previousHits = [];
            }
        }
        this.moveList = boardCallback();
    }

    possibleMoves() {
        let updatedBoard = [];
        this.getBoard().forEach((row, y) => {
            row.forEach((state, x) => {
                if (state != "M" && state != "X") {
                    updatedBoard.push(`${[x, y]}`);
                }
            });
        });
        return updatedBoard;
    }

    getBoard() {
        return this.board.getBoard();
    }

    printBoard() {
        this.board.printout();
    }

    allSunk() {
        return this.board.allSunk();
    }

    reset() {
        this.board.reset();
    }

    getShips() {
        return this.board.getShips();
    }

    getShipObj() {
        return this.board.getShipObj();
    }

    validMove(x, y, ship, vert) {
        return this.board.checkPlacement(
            x,
            y,
            this.board.ships[ship].length,
            vert,
        );
    }
}
