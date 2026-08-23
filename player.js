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
        return this.board.receiveAttack(...args);
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
