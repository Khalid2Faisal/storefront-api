// @ts-ignore
import Client from "../database/client";

export type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
};

export class ProductsTable {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      if (result.rows.length) {
        const products = result.rows;
        conn.release();
        return products;
      }

      conn.release();

      // throw error if products not found
      throw new Error();
    } catch (err) {
      throw new Error("Could not get products");
    }
  }
}
