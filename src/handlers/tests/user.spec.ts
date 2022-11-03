// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import app from "../../app";
// @ts-ignore
import Client from "../../database/client";

const request = supertest(app);

describe("User Handler", () => {
  let token: string;

  afterAll(async () => {
    /* Deleting all the data from the users table. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1";
    await conn.query(sql);
    conn.release();
  });

  it("POST /users endpoint should create new user", async () => {
    const response = await request.post("/users").send({
      firstname: "test",
      lastname: "test",
      email: "test@gmail.com",
      password: "12345678",
    });

    expect(response.status).toBe(200);
    token = response.body;
  });

  it("GET /users endpoint should return a list of users", async () => {
    const response = await request.get("/users").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstname: "test",
        lastname: "test",
        email: "test@gmail.com",
      },
    ]);
  });

  it("GET /users/:id endpoint should return the correct user", async () => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "test",
      lastname: "test",
      email: "test@gmail.com",
    });
  });

  it("POST /users/authenticate endpoint should return a string token", async () => {
    const response = await request.post("/users/authenticate").send({
      email: "test@gmail.com",
      password: "12345678",
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it("PATCH /users/:id endpoint should update a user", async () => {
    const response = await request
      .patch("/users/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "test2@gmail.com",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "test",
      lastname: "test",
      email: "test2@gmail.com",
    });
  });

  it("DELETE /users/:id endpoint should remove the user", async () => {
    const response = await request
      .delete("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "test",
      lastname: "test",
      email: "test2@gmail.com",
    });
  });
});
