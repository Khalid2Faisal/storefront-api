import { PoolClient } from "pg";
// @ts-ignore
import Client from "../database/client";
import { hashPassword, comparePassword } from "../utilities/encrypt";

export type UserType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type UserReturningType = Omit<UserType, "password">;
export type UserLoginType = Pick<UserType, "email" | "password">;

export class User {
  async index(): Promise<UserReturningType[]> {
    try {
      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const sql = "SELECT id, firstname, lastname, email FROM users";

      const result = await conn.query(sql);

      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error("Could not get users.");
    }
  }

  async show(id: string): Promise<UserReturningType> {
    try {
      const sql = "SELECT id, firstname, lastname, email FROM users WHERE id=($1)";
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result = await conn.query(sql, [id]);

      if (result.rows.length) {
        const user = result.rows[0];
        conn.release();
        return user;
      }

      conn.release();

      // throw error if user not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not find user with id of ${id}`);
    }
  }

  async create(usr: UserType): Promise<UserReturningType> {
    try {
      // use the provided usr email to see if the user already exists
      const query = "SELECT * FROM users WHERE email=($1)";
      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const resu = await conn.query(query, [usr.email]);
      if (resu.rows.length) {
        conn.release();
        throw new Error("User with this email already exists.");
      }

      const sql =
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email";

      const hashedPassword = hashPassword(usr.password);
      const result = await conn.query(sql, [
        usr.firstName,
        usr.lastName,
        usr.email,
        hashedPassword,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${usr.firstName}. ${err}`);
    }
  }

  async authenticate(usr: UserLoginType): Promise<UserReturningType | null> {
    try {
      const sql = "SELECT * FROM users WHERE email=($1)";
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result = await conn.query(sql, [usr.email]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (comparePassword(usr.password, user.password)) {
          conn.release();
          return {
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
          };
        }
      }
      conn.release();
      throw new Error("You've entered an invalid email or password.");
    } catch (err) {
      throw new Error(`Could not authenticate user ${usr.email}. ${err}`);
    }
  }

  async update(id: string, usr: UserType): Promise<UserReturningType> {
    try {
      // check if the usr exists and has a password field
      if (usr && usr.password) {
        // hash the password
        // eslint-disable-next-line no-param-reassign
        usr.password = hashPassword(usr.password);
      }

      const keys = Object.keys(usr);
      const fields: string[] = [];

      /* This is a way to dynamically build a SQL statement. */
      keys.forEach((key, index) => {
        fields.push(`${key}=$${index + 1}`);
      });

      // fields array will look like this:
      // fields = ['firstname=$1', 'lastname=$2', 'email=$3', 'password=$4']

      const sql = `UPDATE users SET ${fields.join(
        ", "
      )} WHERE id=${id} RETURNING id, firstname, lastname, email`;

      // @ts-ignore
      const conn: PoolClient = await Client.connect();
      const result = await conn.query(sql, Object.values(usr));
      const user = result.rows[0];

      if (!user) {
        conn.release();
        throw new Error("There is no user with that id in the database.");
      }

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not update user with id of ${id}. ${err}`);
    }
  }

  /**
   * We're using the `DELETE` SQL statement to delete a user from the database
   * @param {string} id - string - the id of the user to delete
   * @returns The user that was deleted.
   */
  async delete(id: string): Promise<UserReturningType> {
    try {
      const sql =
        "DELETE FROM users WHERE id=($1) RETURNING id, firstname, lastname, email";
      // @ts-ignore
      const conn: PoolClient = await Client.connect();

      const result = await conn.query(sql, [id]);
      const user = result.rows[0];

      if (!user) {
        conn.release();
        throw new Error("There is no user with that id in the database.");
      }

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user with id of ${id}. ${err}`);
    }
  }
}
