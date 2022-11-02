// @ts-ignore
import Client from "../../database/client";
import { Order } from "../order";
import { Product } from "../product";
import { User } from "../user";

const order = new Order();
const product = new Product();
const user = new User();

describe("Order Model", () => {
  beforeAll(async () => {
    await user.create({
      firstname: "John",
      lastname: "Doe",
      email: "test@gmail.com",
      password: "12345678",
    });
    await product.createCategory("computers");
    await product.create({
      name: "laptop",
      price: 1000,
      category_id: 1,
    });

    console.log("inserted a user, a category and a product before all order tests");
  });

  afterAll(async () => {
    /* Deleting all the data from the users, products, categories, and orders tables. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql =
      "DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM categories;\n ALTER SEQUENCE categories_id_seq RESTART WITH 1;";
    await conn.query(sql);
    conn.release();
    console.log(
      "\nAll data deleted from the orders, users, products, and categories tables."
    );
  });

  it("should have an index method", () => {
    expect(order.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(order.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(order.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(order.delete).toBeDefined();
  });

  it("should have a currentOrdersByUser method", () => {
    expect(order.currentOrdersByUser).toBeDefined();
  });

  it("should have a completedOrdersByUser method", () => {
    expect(order.completedOrdersByUser).toBeDefined();
  });

  it("should have a addProduct method", () => {
    expect(order.addProduct).toBeDefined();
  });

  it("index method should return a list of orders", async () => {
    const result = await order.index();
    expect(result).toEqual([]);
  });

  it("create method should add an order", async () => {
    const result = await order.create({
      user_id: 1,
      status: "active",
    });
    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("show method should return an order", async () => {
    const result = await order.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });

  it("currentOrdersByUser method should return a list of active orders", async () => {
    const result = await order.currentOrdersByUser(1);
    expect(result).toEqual([
      {
        id: 1,
        user_id: "1",
        status: "active",
      },
    ]);
  });

  it("completedOrdersByUser method should return a list of completed orders", async () => {
    const result = await order.completedOrdersByUser(1);
    expect(result).toEqual([]);
  });

  it("addProduct method should add a product to an order", async () => {
    const result = await order.addProduct(1, {
      product_id: 1,
      quantity: 1,
    });
    expect(result).toEqual({
      id: 1,
      quantity: 1,
      order_id: "1",
      product_id: "1",
    });
  });
});
