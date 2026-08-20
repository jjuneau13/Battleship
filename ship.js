export class Ship {
    constructor(length) {
        this.length = length;
        this.startX = null;
        this.startY = null;
        this.vert = null;
        this.hits = 0;
        this.sunk = false;
        this.placed = false;
    }

    hit() {
        this.hits++;
        if (this.hits >= this.length) this.sunk = true;
    }

    placedShip(x, y, vert) {
        this.startX = x;
        this.startY = y;
        this.vert = vert;
        this.placed = true;
    }
}
