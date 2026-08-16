function grid() {
    const playerBoard = document.querySelector(".player-board");
    const opponentBoard = document.querySelector(".opponent-board");
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement("button");
        const div = document.createElement("div");
        button.id = `${i}`;
        div.id = `${-i}`;
        playerBoard.append(div);
        opponentBoard.append(button);
    }
}

function displayShips(ships) {
    for (let i = 1; i <= 100; i++) {
        let tile = document.getElementById(i);
        tile.setAttribute("class", `${ships[i - 1]}`);
    }
}

export { grid, displayShips };
