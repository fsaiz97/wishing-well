class Wish {
    constructor(wish) {
        if (arguments.length !== 1) {
            throw new Error("Wish class constructor takes 1 argument.");
        }

        this.name = wish.name;
        this.wish = wish.wish;
        this.grants = wish._grants;
        this.denys = wish._denys;
        this.timestamp = wish.timestamp;
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
