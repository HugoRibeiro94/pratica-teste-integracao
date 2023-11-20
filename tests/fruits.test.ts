import supertest from "supertest";
import { Fruit } from "repositories/fruits-repository";
import { app } from "index";
import fruits from "data/fruits";

const api = supertest(app);

beforeEach(async () => {
    await api.delete;
  });

describe("POST /fruits tests", () => {
  it("should return 201 when inserting a fruit", async () => {
    const fruits: Fruit = {
        id: expect.any(Number),
        name: "banana",
        price: 10
    };

    const { status } = await api.post("/fruits").send(fruits);
    expect(status).toBe(201);
  });

  it("should return 409 when inserting a fruit that is already registered", async () => {
    const fruits: Fruit = {
        id: expect.any(Number),
        name: "maça",
        price: 5
    };

    const { status } = await api.post("/fruits").send(fruits);
    expect(status).toBe(409);
  });

});

describe("GET /fruits tests", () => {
  it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
    const fruits: Fruit = {
        id: expect.any(Number),
        name: "maça",
        price: 5
    };

    const { status } = await api.get(`/fruits/${fruits.id}`);
    expect(status).toBe(404);
  });

  it("should return 400 when id param is present but not valid", async () => {
    const { status } = await api.get("/fruits/1234");
    expect(status).toBe(400);
  });

  it("should return all fruits if no id is present", async () => {
    const fruits: Fruit = {
        id: expect.any(Number),
        name: "banana",
        price: 10
    };

    const { status, body } = await api.get("/fruits");
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price:expect.any(Number)
      })
    ]))
  });

})