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

    CPUattack(attackCallback) {
        if (this.previousHits.length === 0) {
            let rand = Math.floor(Math.random() * this.moveList.length);
            let [x, y] = this.#popMove(rand);
            if (attackCallback(x, y)) {
                this.previousHits.push([x, y]);
            }
        } else {
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
                    this.previousHits.push(x, y);
                }
                if (attack.sunk) {
                    this.previousHits = [];
                }
            } else {
            }
        }
    }

    #popMove(index) {
        [this.moveList[index], this.moveList[this.moveList.length - 1]] = [
            this.moveList[this.moveList.length - 1],
            this.moveList[index],
        ];
        let coord = this.moveList.pop();
        return [parseInt(coord.at(0)), parseInt(coord.at(2))];
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
