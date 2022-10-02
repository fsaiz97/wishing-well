// Hardcoded initial list of wishList

class Wish {
    constructor(name, wish) {
        if (arguments.length !== 2) {
            throw new Error("Wish class constructor takes 2 arguments.");
        }

        this.name = name;
        this.wish = wish;
        this.grants = 0;
        this.denys = 0;
        this.timestamp = new Date();
    }

    get grants() {
        return this._grants
    };
    set grants(value) {
        if (Number.isInteger(value) && value >= 0) {
            this._grants = value
        } else {
            throw new Error("Vote values must be positive");
        }
    };

    get denys() {
        return this._denys;
    };
    set denys(value) {
        if (value >= 0) {
            this._denys = value
        } else {
            throw new Error("Vote values must be positive");
        }
    };

    totalVotes() {
        return this.grants + this.denys;
    }

    popularity() {
        return this.grants - this.denys;
    }
}

let wishList = [
    {
        id: 0,
        wish: new Wish("Felix", "My code will be bug-free.")
    }, {
        id: 1,
        wish: new Wish("Anne", "To go to Antarctica.")
    }
]

wishList[0].wish.grants = 1;
wishList[1].wish.denys = 1;

module.exports = {
    wishList,
    Wish
}
