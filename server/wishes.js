// Hardcoded initial list of wishes

class Wish {
    constructor(user, wish) {
        if (arguments.length !== 2) {
            throw new Error("Wish class constructor takes 2 arguments.");
        }

        this.owner = user;
        this.wish = wish;
        this._votes = {
            grants: 0,
            denys: 0
        }
    }

    get grants() { return this._votes.grants };
    set grants(value) { this._votes.grants = value };

    get denys() { return this._votes.denys };
    set denys(value) { return this._votes.denys = value };

    totalVotes() {
        return this.grants + this.denys;
    }
}

let wishes = [
    {
        id: 0,
        wish: new Wish("Felix", "My code will be bug-free.")
    },
    {
        id: 1,
        wish: new Wish("Anne", "To go to Antartica.")
    }
]

module.exports = {
    wishes,
    Wish
}