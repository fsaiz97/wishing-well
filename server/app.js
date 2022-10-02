const express = require("express");
const cors = require("cors");

const {wishList, Wish} = require("./wishes");

function middlewareSetup(app) {
    app.use(cors()); // Allow requests from other origins/machines
    app.use(express.json()); // Tell Express to read the body of POST requests
}

function routeSetup(app) {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to the wishing well!");
    });

    app.post("/wishes/add-a-wish", (req, res) => {
        try {
            console.log(req.body.name, req.body.wish)
            let newWish = new Wish(req.body.name, req.body.wish);
            let newEntry = {
                id: wishList.length,
                wish: newWish
            };
            wishList.push(newEntry);

            res.status(201).send(newEntry);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    })

    app.get("/wishes", (req, res) => {
        try {
            res.status(200).send(wishList);
        } catch (err) {
            res.status(404).send({error: err.message})
        }
    })

    app.get("/wishes/recent", (req, res) => {
        try {
            const sortedWishes = [...wishList].sort((a, b) => { return b.wish.timestamp.getTime() - a.wish.timestamp.getTime(); })

            res.status(200).send(sortedWishes.slice(0, 10));

        } catch (err) {
            res.status(500).send({error: err.message})
        }
    })

    app.get("/wishes/popular", (req, res) => {
        try {
            const filter = req.query.filter;
            if (filter === null || filter === undefined) {
                throw new Error("Invalid query string");
            }

            let sortedWishes;
            if (filter === "most") {
                sortedWishes = [...wishList].sort((a, b) => { return b.wish.popularity() - a.wish.popularity(); })
            } else if (filter === "least") {
                sortedWishes = [...wishList].sort((a, b) => { return a.wish.popularity() - b.wish.popularity(); })
            } else {
                throw new Error("Invalid query string");
            }

            res.status(200).send(sortedWishes.slice(0, 10));

        } catch (err) {
            if (err.message === "Invalid query string") {
                res.status(400).send({error: err.message})
            }
            res.status(500).send({error: err.message})
        }
    })

    app.get("/wishes/:id", (req, res) => {
        try {
            let id = parseInt(req.params.id);
            res.status(200).send(wishList[id]);
        } catch (err) {
            res.status(404).send({error: err.message});
        }
    })

    app.get("/wishes/:id/votes", (req, res) => {
        try {
            let id = parseInt(req.params.id);
            let wish = wishList[id].wish;
            res.status(200).send({grants: wish.grants, denys: wish.denys});
        } catch (err) {
            res.status(404).send({error: err.message});
        }
    })

    // /wishes/:id?vote=voteType
    app.put("/wishes/:id", (req, res) => {
        try {
            const vote = req.query.vote;
            if (vote === null || vote === undefined) {
                throw new Error("Invalid query string");
            }

            if (vote === "grant") {
                let curr = wishList[req.params.id].wish.grants;
                wishList[req.params.id].wish.grants = curr + 1;
            } else if (vote === "deny") {
                let curr = wishList[req.params.id].wish.denys;
                wishList[req.params.id].wish.denys = curr + 1;
            } else {
                throw new Error("Invalid query string");
            }

            res.status(200).send({message: `${vote} vote added.`});

        } catch (err) {
            if (err.message === "Invalid query string") {
                res.status(400).send({error: err.message})
            }
            res.status(500).send({error: err.message})
        }
    })
}

const app = express();

middlewareSetup(app);
routeSetup(app);

module.exports = {
    app
};
