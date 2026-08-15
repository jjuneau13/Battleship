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
    beforeEach(() => {
        testGameboard = new Gameboard();
    });
    test("Placing horizontal ship in gameboard", () => {
        testGameboard.placeShip([1, 4], "B");
        expect(testGameboard.getBoard()).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, "B", "B", "B", "B", 0, 0],
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
    test("Placing vertical ship on gameboard", () => {
        testGameboard.placeShip([3, 2], "D", true);
        expect(testGameboard.getBoard()).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, "D", 0, 0, 0, 0, 0, 0, 0],
            [0, 0, "D", 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]);
    });
    test("Placing ship near edge", () => {
        testGameboard.placeShip([9, 5], "A");
        expect(testGameboard.getBoard()).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, "A", "A", "A", "A", "A"],
        ]);
    });
    test("Placing horizontal ship outside border throws error", () => {
        expect(() => testGameboard.placeShip([9, 6], "A")).toThrow(Error);
    });
    test("Placing vertical ship outside border throws error", () => {
        expect(() => testGameboard.placeShip([6, 9], "A")).toThrow(Error);
    });
});
