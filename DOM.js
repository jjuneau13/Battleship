let activeShip = null;
let gameStart = false;

function grid(callback, playerCallback) {
    const playerBoard = document.querySelector(".player-board");
    const opponentBoard = document.querySelector(".opponent-board");
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement("button");
        const playerbutton = document.createElement("button");
        button.id = `${i}`;
        button.addEventListener("click", () => {
            callback((i - 1) % 10, Math.floor((i - 1) / 10));
        });
        playerbutton.addEventListener("click", () => {
            playerCallback(
                [(i - 1) % 10, Math.floor((i - 1) / 10)],
                activeShip,
            );
        });
        playerbutton.id = `${-i}`;
        playerBoard.append(playerbutton);
        opponentBoard.append(button);
    }
}

function displayShips(p1Ships, p2Ships) {
    for (let i = 1; i <= 100; i++) {
        let tile = document.getElementById(i);
        tile.setAttribute("class", `${p1Ships[i - 1]}`);
    }
    for (let i = 1; i <= 100; i++) {
        let tile = document.getElementById(-i);
        tile.setAttribute("class", `${p2Ships[i - 1]}`);
    }
}

function createShipBar(token) {
    const shipBar = document.querySelector(".ships");
    const newButton = document.createElement("button");
    newButton.setAttribute("class", token);
    newButton.addEventListener("click", () => (activeShip = token));
    shipBar.append(newButton);
}

function changeGameState() {
    gameStart = !gameStart;
}

export { grid, displayShips, createShipBar };
