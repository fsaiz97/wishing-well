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
}

const app = express();

middlewareSetup(app);
routeSetup(app);

module.exports = { app };
