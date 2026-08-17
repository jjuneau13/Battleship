function grid(callback) {
    const playerBoard = document.querySelector(".player-board");
    const opponentBoard = document.querySelector(".opponent-board");
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement("button");
        const div = document.createElement("div");
        button.id = `${i}`;
        button.addEventListener("click", () => {
            callback((i - 1) % 10, Math.floor((i - 1) / 10));
        });
        div.id = `${-i}`;
        playerBoard.append(div);
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

export { grid, displayShips };
