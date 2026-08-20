import { Player } from "./player.js";
import { grid, displayShips, createShipBar } from "./DOM.js";

let player1 = new Player();
let player2 = new Player();
/*player1.placeShip([2, 4], "A");
player1.placeShip([2, 6], "B");
player1.placeShip([2, 1], "S");
player1.placeShip([2, 8], "D");
player1.placeShip([0, 3], "C", true);*/
//player2.placeShip([2, 4], "A");
//player2.placeShip([2, 6], "B");
//player2.placeShip([2, 1], "S");
//player2.placeShip([2, 8], "D");
//player2.placeShip([0, 3], "C", true);

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
);
function display() {
    displayShips(
        player1
            .getBoard()
            .flat()
            .map((tile) => {
                return tile == 0 ? "" : tile;
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
