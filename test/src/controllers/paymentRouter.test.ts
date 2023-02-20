import request from "supertest";

import app from "../../../src/index";

// Reset endpoint
describe("POST /reset", () => {
    test("Reset state before starting tests", async () => {
        const res = await request(app).post("/reset");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("OK");
    });
});

// Event endpoint
describe("POST /event", () => {
    test("Create account with initial balance", async () => {
        const res = await request(app)
            .post("/event")
            .send({ type: "deposit", destination: "100", amount: 10 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ destination: { id: "100", balance: 10 } });
    });
});

describe("POST /event", () => {
    test("Deposit into existing account", async () => {
        const res = await request(app)
            .post("/event")
            .send({ type: "deposit", destination: "100", amount: 10 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ destination: { id: "100", balance: 20 } });
    });
});

describe("POST /event", () => {
    test("Withdraw from non-existing account", async () => {
        const res = await request(app)
            .post("/event")
            .send({ type: "withdraw", origin: "200", amount: 10 });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(0);
    });
});

describe("POST /event", () => {
    test("Withdraw from existing account", async () => {
        const res = await request(app)
            .post("/event")
            .send({ type: "withdraw", origin: "100", amount: 5 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ origin: { id: "100", balance: 15 } });
    });
});

describe("POST /event", () => {
    test("Transfer from non-existing account", async () => {
        const res = await request(app).post("/event").send({
            type: "transfer",
            origin: "200",
            amount: 15,
            destination: "300",
        });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(0);
    });
});

describe("POST /event", () => {
    test("Transfer from existing account", async () => {
        const res = await request(app).post("/event").send({
            type: "transfer",
            origin: "100",
            amount: 15,
            destination: "300",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            origin: { id: "100", balance: 0 },
            destination: { id: "300", balance: 15 },
        });
    });
});

// Balance endpoint
describe("GET /balance", () => {
    test("Get balance for non-existing account", async () => {
        const res = await request(app).get("/balance?account_id=1234");

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(0);
    });
});

describe("GET /balance", () => {
    test("Get balance for existing account", async () => {
        const res = await request(app).get("/balance?account_id=100");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(0);
    });
});
