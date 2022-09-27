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
        const response = await request(app).post("/wishes/add-a-wish").send(wish);
        expect(response.statusCode).toBe(201);
    })

    describe("Viewing individual wishes", () => {
        test("can see a particular wish", async () => {
            const response = await request(app).get("/wishes/0");
            expect(response.statusCode).toBe(200);
            expect(response.body.wish.owner).toBe("Felix");
        })

        test("can see a wish's votes", async () => {
            const response = await request(app).get("/wishes/0/votes");
            expect(response.statusCode).toBe(200);
            expect(response.body.grants).toEqual(1);
            expect(response.body.denys).toEqual(0);
        })
    })

    describe("View most/least popular wishes", () => {
        test("Can view 10 most popular wishes", async () => {
            const response = await request(app).get("/wishes/popular?filter=most");
            expect(response.statusCode).toBe(200);
            expect(response.body[0].wish.owner).toBe("Felix");
        })

        test("Can view 10 least popular wishes", async () => {
            const response = await request(app).get("/wishes/popular?filter=least");
            expect(response.statusCode).toBe(200);
            expect(response.body[0].wish.owner).toBe("Anne");
        })
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
