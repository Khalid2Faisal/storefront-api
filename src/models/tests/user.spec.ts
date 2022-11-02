import { User } from "../user";

const user = new User();

describe("User Model", () => {
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

  it("index method should return a list of users", async () => {
    const result = await user.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "Khalid",
        lastname: "Dashash",
        email: "test@gmail.com",
      },
    ]);
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

  it("delete method should remove the user", async () => {
    user.delete("1");
    const result = await user.index();

    expect(result).toEqual([]);
  });
});
