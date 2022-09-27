const express = require("express");
const cors = require("cors");

const { wishes, Wish } = require("./wishes");

function middlewareSetup(app) {
    app.use(cors()); // Allow requests from other origins/machines
    app.use(express.json()); // Tell Express to read the body of POST requests
}

function routeSetup(app) {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to the wishing well!");
    });

    app.post("/add-a-wish", (req, res) => {
        try {
            let newWish = new Wish(req.body.user, req.body.wish);
            let newEntry = {
                id: wishes.length,
                wish: newWish
            };
            wishes.push(newEntry);
            
            res.status(201).send(newEntry);
        } catch (error) {
            res.status(400).send({ error: error.message});
        }
    })

    app.get("/wishes", (req, res) => {
        try {
            res.status(200).send(wishes);
        } catch (err) {
            res.status(404).send({ error: err.message})
        }
    })

    app.put("/wishes/:id", (req, res) => {
        try {
            const vote = req.query.vote;
            if (vote === null || vote === undefined) {
                throw new Error("Invalid query string");
            }

            if (vote === "grant") {
                let curr = wishes[req.params.id].wish.grants;
                wishes[req.params.id].wish.grants = curr + 1;
            } else if (vote === "deny") {
                let curr = wishes[req.params.id].wish.deny;
                wishes[req.params.id].wish.deny = curr + 1;
            } else {
                throw new Error("Invalid query string");
            }

            res.status(200).send({ message: `${vote} vote added.` });

        } catch (err) {
            if (err.message === "Invalid query string") {
                res.status(400).send({ error: err.message })
            }
            res.status(500).send({ error: err.message})
        }
    })
}

const app = express();

middlewareSetup(app);
routeSetup(app);

module.exports = { app };
