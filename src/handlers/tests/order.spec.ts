// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import app from "../../app";
// @ts-ignore
import Client from "../../database/client";

const request = supertest(app);

describe("Order Handler", () => {
  let token: string;

  beforeAll(async () => {
    // create a test user
    const response = await request.post("/users").send({
      firstname: "test",
      lastname: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
    token = response.body;
    // create a test category
    await request.post("/categories").set("Authorization", `Bearer ${token}`).send({
      name: "test",
    });
    // create a test product
    await request.post("/products").set("Authorization", `Bearer ${token}`).send({
      name: "test",
      price: 1,
      category_id: 1,
    });
  });

  afterAll(async () => {
    /* Deleting all the data from the users, products, categories, and orders tables. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql =
      "DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM categories;\n ALTER SEQUENCE categories_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
  });

  it("GET /orders endpoint should return a list of orders", async () => {
    const response = await request.get("/orders").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("POST /orders endpoint should add an order", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 1,
        status: "active",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("GET /orders/:id should return the correct order", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("POST /orders/current endpoint should return a list of active orders of a user", async () => {
    const response = await request
      .post("/orders/current")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        user_id: "1",
        status: "active",
      },
    ]);
  });

  it("POST /orders/completed endpoint should return a list of completed orders", async () => {
    const response = await request
      .post("/orders/completed")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: "1",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("POST /orders/:id/products should add a product to an order", async () => {
    const response = await request
      .post("/orders/1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product_id: 1,
        quantity: "1",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      quantity: 1,
      order_id: "1",
      product_id: "1",
    });
  });
});
