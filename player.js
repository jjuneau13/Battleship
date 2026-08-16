import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(cpu = false) {
        this.cpu = cpu;
        this.board = new Gameboard();
    }

    placeShip(...args) {
        this.board.placeShip(...args);
    }

    receiveAttack(...args) {
        this.board.receiveAttack(...args);
    }

    getBoard() {
        return this.board.getBoard();
    }

    printBoard() {
        this.board.printout();
    }
}
