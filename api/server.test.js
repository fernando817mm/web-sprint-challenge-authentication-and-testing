const request = require("supertest");
const server = require("./server");

const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBeTruthy();
});

describe("REGISTER | /api/auth/register", () => {
  test("responds with correct object on success", async () => {
    const inserted = await request(server).post("/api/auth/register").send({
      username: "fernando",
      password: "martinez",
    });
    expect(inserted.body).toMatchObject({ username: "fernando" });
  });
  test("responds with correct error message on incorrect payload", async () => {
    const inserted = await request(server).post("/api/auth/register").send({
      name: "fernando",
    });
    expect(inserted.text).toEqual(
      '{"message":"username and password required"}'
    );
  });
});

describe("LOGIN | /api/auth/login", () => {
  test("responds with correct welcome message", async () => {
    await request(server).post("/api/auth/register").send({
      username: "fernando",
      password: "martinez",
    });
    const inserted = await request(server).post("/api/auth/login").send({
      username: "fernando",
      password: "martinez",
    });
    expect(inserted.body).toMatchObject({ message: "welcome, fernando" });
  });
  test("responds with correct error message on incorrect payload", async () => {
    await request(server).post("/api/auth/register").send({
      username: "fernando",
      password: "martinez",
    });
    const inserted = await request(server).post("/api/auth/login").send({
      username: "fernando",
      password: "asdfsd",
    });
    expect(inserted.text).toEqual('{"message":"invalid credentials"}');
  });
});
