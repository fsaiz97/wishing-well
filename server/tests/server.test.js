const request = require("supertest");
const {app} = require("../app");

describe("server tests", () => {
    it("Should respond to get request at root", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    })

    test("Can see submitted wishes", async () => {
        const response = await request(app).get("/wishes");
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

    describe("Voting tests", () => {
        test("Can vote to grant wish", async () => {
            const response = await request(app).put("/wishes/0?vote=grant");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({message: "grant vote added."});
        })

        test("Can vote to deny wish", async () => {
            const response = await request(app).put("/wishes/0?vote=deny");
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({message: "deny vote added."});
        })
    })


})
