const request = require("supertest");
const { app } = require("../app");

describe("server tests", () => {
    it("Should respond to get request at root", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    })
})
