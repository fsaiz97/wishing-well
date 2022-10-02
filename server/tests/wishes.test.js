const { Wish } = require("../wishes")

describe("Wish class tests", () => {
    let exampleWish = () => {
        let wish = new Wish("Bob", "A new kettle");
        return wish;
    }

    test("The constructor takes exactly 2 arguments", () => {
        expect(() => {
            new Wish();
        }).toThrow(new Error("Wish class constructor takes 2 arguments."));

        expect(() => {
            new Wish("Bob");
        }).toThrow(new Error("Wish class constructor takes 2 arguments."));

        expect(() => {
            new Wish("Bob", "A new kettle", true);
        }).toThrow(new Error("Wish class constructor takes 2 arguments."));
    })

    it("gets grants", () => {
        let wish = exampleWish();
        expect(wish.grants).toBe(0);
    })

    it("gets denys", () => {
        let wish = exampleWish();
        expect(wish.denys).toBe(0);
    })

    it("can set vote.grants", () => {
        let wish = exampleWish();
        wish.grants = 2;
        expect(wish.grants).toBe(2);
    })

    it("can set vote.grants", () => {
        let wish = exampleWish();
        wish.denys = 2;
        expect(wish.denys).toBe(2);
    })

    it("returns the correct number of total votes", () => {
        let wish = exampleWish();
        wish.grants = 3;
        wish.denys = 2;
        expect(wish.totalVotes()).toBe(5);
    })
})
