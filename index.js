import { Player } from "./player.js";
import { grid, displayShips } from "./DOM.js";

let player1 = new Player();
let player2 = new Player();
player1.placeShip([2, 4], "A");
player1.placeShip([2, 6], "B");
player1.placeShip([2, 1], "S");
player1.placeShip([2, 8], "D");
player1.placeShip([0, 3], "C", true);
grid();
displayShips(
    player1
        .getBoard()
        .flat()
        .map((tile) => {
            return tile == 0 ? "" : tile;
        }),
);
