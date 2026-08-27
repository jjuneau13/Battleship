import { Player } from "./player.js";
import { grid, displayShips, createShipBar } from "./DOM.js";

let player1 = new Player(true);
let player2 = new Player();

let gameStart = false;

grid(
    (x, y) => {
        player1.receiveAttack(x, y);
        if (player1.allSunk()) {
            gameStart = false;
            player1.reset();
            player2.reset();
        }
        display();
        //Use player1.attack()
        player1.CPUattack(
            (x, y) => player2.receiveAttack(x, y),
            () => player2.possibleMoves(),
        );
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
display();
