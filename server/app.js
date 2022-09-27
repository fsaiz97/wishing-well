const express = require("express");
const cors = require("cors");

function middlewareSetup(app) {
    app.use(cors()); // Allow requests from other origins/machines
    app.use(express.json()); // Tell Express to read the body of POST requests
}

function routeSetup(app) {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to the wishing well!");
    })
}

const app = express();

middlewareSetup(app);
routeSetup(app);

module.exports = { app };
