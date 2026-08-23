import { Player } from "./player.js";
import { grid, displayShips, createShipBar } from "./DOM.js";

let player1 = new Player();
let player2 = new Player();

let gameStart = false;

grid(
    (x, y) => {
        player1.receiveAttack(x, y);
        if (player1.allSunk()) {
            player1.reset();
            player2.reset();
        }
        display();
    },
    (x, y, token, vertical) => {
        player2.placeShip(x, y, token, vertical);
        display();
    },
    () => {
        for (let ship of player2.getShipObj()) {
            if (!ship.placed) return false;
        }
        gameStart = true;
        return true;
    },
    () => {
        if (!gameStart) {
            player2.reset();
            display();
        }
    },
);

function placeCPUShips() {
    for (let ship of player1.getShips()) {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        let vert = Math.random() > 0.5;
        while (!player1.validMove(x, y, ship, vert)) {
            x = Math.floor(Math.random() * 9);
            y = Math.floor(Math.random() * 9);
            vert = Math.random() > 0.5;
        }
        player1.placeShip(x, y, ship, vert);
    }
}

function display() {
    displayShips(
        player1
            .getBoard()
            .flat()
            .map((tile) => {
                return tile == 0 || (tile != "M" && tile != "X") ? "" : tile;
            }),
        player2
            .getBoard()
            .flat()
            .map((tile) => {
                return tile == 0 ? "" : tile;
            }),
    );
}
player2.getShips().forEach((shipToken) => createShipBar(shipToken));
placeCPUShips();
display();
