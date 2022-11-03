// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import app from "../../app";
// @ts-ignore
import Client from "../../database/client";

const request = supertest(app);

describe("Product Handler", () => {
  let token: string;

  // create a test user before all tests
  beforeAll(async () => {
    const response = await request.post("/users").send({
      firstname: "test",
      lastname: "test",
      email: "test@gmail.com",
      password: "12345678",
    });
    token = response.body;
  });

  afterAll(async () => {
    /* Deleting all the data from the products and categories tables. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql =
      "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM categories;\n ALTER SEQUENCE categories_id_seq RESTART WITH 1";
    await conn.query(sql);
    conn.release();
  });

  it("GET /products endpoint should return a list of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("POST /categories endpoint should create a new category", async () => {
    const response = await request
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
    });
  });

  it("POST /products endpoint should add a product", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
        price: 10,
        category_id: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      price: 10,
      category_id: 1,
    });
  });

  it("GET /products/:id should return the correct product", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      price: 10,
      category_id: 1,
    });
  });

  it("GET /products/category/:id should return a list of products in the same category", async () => {
    const response = await request.get("/products/category/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "test",
        price: 10,
        category_id: 1,
      },
    ]);
  });
});
