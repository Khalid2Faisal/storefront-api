// @ts-ignore
import Client from "../../database/client";
import { User } from "../user";

const user = new User();

describe("User Model", () => {
  afterAll(async () => {
    /* Deleting all the data from the users table. */
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1";
    await conn.query(sql);
    conn.release();
  });

  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(user.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(user.create).toBeDefined();
  });

  it("should have an authenticate method", () => {
    expect(user.authenticate).toBeDefined();
  });

  it("should have a update method", () => {
    expect(user.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(user.delete).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await user.index();
    expect(result).toEqual([]);
  });

  it("create method should add a user", async () => {
    const result = await user.create({
      firstname: "Khalid",
      lastname: "Dashash",
      email: "test@gmail.com",
      password: "12345678",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "Khalid",
      lastname: "Dashash",
      email: "test@gmail.com",
    });
  });

  it("show method should return the correct user", async () => {
    const result = await user.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: "Khalid",
      lastname: "Dashash",
      email: "test@gmail.com",
    });
  });

  it("authenticate method should return a string token", async () => {
    const result = await user.authenticate({
      email: "test@gmail.com",
      password: "12345678",
    });
    expect(result).toBeTruthy();
  });

  it("update method should update a user", async () => {
    const result = await user.update("1", {
      email: "test1@gmail.com",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "Khalid",
      lastname: "Dashash",
      email: "test1@gmail.com",
    });
  });

  it("delete method should remove the user", async () => {
    user.delete("1");
    const result = await user.index();

    expect(result).toEqual([]);
  });
});
