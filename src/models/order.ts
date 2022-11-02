// @ts-ignore
import Client from "../database/client";

export type OrderProduct = {
  id?: number;
  quantity: number | string;
  product_id: number | string;
};

// OrderProductReturning type is the same as OrderProduct but with the oreder_id property.
export type OrderProductReturning = OrderProduct & { order_id: number | string };

export type OrderType = {
  id?: number;
  status: string;
  user_id: number | string;
};

export class Order {
  async index(): Promise<OrderType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error("Could not get orders");
    }
  }

  async show(id: number): Promise<OrderType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";

      const result = await conn.query(sql, [id]);

      if (result.rows.length) {
        const order = result.rows[0];
        conn.release();
        return order;
      }

      conn.release();

      // throw error if order not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not find order with the id ${id}`);
    }
  }

  async create(o: OrderType): Promise<OrderType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. ${err}`);
    }
  }

  async delete(id: number): Promise<OrderType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      // check if the order already does not exist
      const query = "SELECT * FROM orders WHERE id=($1)";
      const res = await conn.query(query, [id]);
      if (!res.rows.length) {
        conn.release();
        throw new Error("The order you are trying to delete does not exist");
      }

      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";

      const result = await conn.query(sql, [id]);

      if (result.rows.length) {
        const order = result.rows[0];
        conn.release();
        return order;
      }

      conn.release();

      // throw error if order not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not delete order with the id ${id}. ${err}`);
    }
  }

  async currentOrdersByUser(id: number): Promise<OrderType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";

      const result = await conn.query(sql, [id, "active"]);

      if (result.rows.length) {
        const orders = result.rows;
        conn.release();
        return orders;
      }

      conn.release();

      // throw error if order not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not find order for the user with the id ${id}. ${err}`);
    }
  }

  async completedOrdersByUser(id: number): Promise<OrderType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";

      const result = await conn.query(sql, [id, "complete"]);

      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Could not get completed orders for user with the id ${id}`);
    }
  }

  async addProduct(id: number, p: OrderProduct): Promise<OrderProductReturning> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products (quantity, product_id, order_id) VALUES($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [p.quantity, p.product_id, id]);

      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(`Could not add product to order with the id ${id}. ${err}`);
    }
  }
}
