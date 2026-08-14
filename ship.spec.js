import { beforeEach, describe, suite } from "node:test";
import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";

describe("Ship testing", () => {
    let testShip = new Ship(2);
    test("Not sunk after one hit", () => {
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    });
    test("Sunk after 2 hits", () => {
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });
});

describe("Gameboard testing", () => {
    let testGameboard = new Gameboard();
    test("Placing ship in gameboard", () => {
        testGameboard.placeShip([1, 4], "B", "h");
        expect(testGameboard.getBoard()).toBe([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, "B", "B", "B", 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);
    });
});
