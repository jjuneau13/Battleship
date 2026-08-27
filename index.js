import { Player } from "./player.js";
import { grid, displayShips, createShipBar, changeGameState } from "./DOM.js";

let player1 = new Player(true);
let player2 = new Player();

let gameStart = false;

grid(
    //function to pass to DOM for human player to attack CPU ships with buttons
    (x, y) => {
        player1.receiveAttack(x, y);
        if (player1.allSunk()) {
            gameStart = false;
            changeGameState();
        }
        display();
        //Intelligent CPU attacking phase
        player1.CPUattack(
            (x, y) => player2.receiveAttack(x, y),
            () => player2.possibleMoves(),
        );
        if (player2.allSunk()) {
            gameStart = false;
            changeGameState();
        }
        display();
    },
    //function to allow player to place ships by clicking ship then grid
    (x, y, token, vertical) => {
        player2.placeShip(x, y, token, vertical);
        display();
    },
    //function to start the game
    () => {
        for (let ship of player2.getShipObj()) {
            if (!ship.placed) return false;
        }
        gameStart = true;
        return true;
    },
    //function to reset the board before playing
    () => {
        if (!gameStart) {
            player1.reset();
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
