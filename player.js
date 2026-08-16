import { Gameboard } from "./gameboard.js";

export class Player {
    constructor(cpu = false) {
        this.cpu = cpu;
        this.board = new Gameboard();
    }
}
