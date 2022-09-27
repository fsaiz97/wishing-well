const request = require("supertest");
const { app } = require("../app");

describe("server tests", () => {
    it("Should respond to get request at root", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    })

    it("posts a new wish sent in json form", async () => {
        const wish = {
            user: "Bob",
            wish: "A new kettle"
        }
        const response = await request(app).post("/add-a-wish").send(wish);
        expect(response.statusCode).toBe(201);
    })
})
