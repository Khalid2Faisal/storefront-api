// @ts-ignore
import Client from "../../database/client";
import { Product } from "../product";

const product = new Product();

describe("Product Model", () => {
  afterAll(async () => {
    /* Deleting all the data from the products and categories tables. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql =
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM categories;\n ALTER SEQUENCE categories_id_seq RESTART WITH 1";
    await conn.query(sql);
    conn.release();
  });

  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(product.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(product.create).toBeDefined();
  });

  it("should have a createCategory method", () => {
    expect(product.createCategory).toBeDefined();
  });

  it("should have a getByCategory method", () => {
    expect(product.getByCategory).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  });

  it("createCategory method should create a new category", async () => {
    const result = await product.createCategory("computers");

    expect(result).toEqual({
      id: 1,
      name: "computers",
    });
  });

  it("create method should add a product", async () => {
    const result = await product.create({
      name: "laptop",
      price: 1000,
      category_id: 1,
    });
    expect(result).toEqual({
      id: 1,
      name: "laptop",
      price: 1000,
      category_id: 1,
    });
  });

  it("show method should return the correct product", async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: "laptop",
      price: 1000,
      category_id: 1,
    });
  });

  it("getByCategory should return a list of products in the same category", async () => {
    const result = await product.getByCategory(1);
    expect(result).toEqual([
      {
        id: 1,
        name: "laptop",
        price: 1000,
        category_id: 1,
      },
    ]);
  });
});
