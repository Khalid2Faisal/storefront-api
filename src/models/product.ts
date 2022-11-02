// @ts-ignore
import Client from "../database/client";

export type ProductType = {
  id?: number;
  name: string;
  price: number;
  category_id: number;
};

export type Category = {
  id: number;
  name: string;
};

export class Product {
  async index(): Promise<ProductType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error("Could not get products");
    }
  }

  async show(id: number): Promise<ProductType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";

      const result = await conn.query(sql, [id]);

      if (result.rows.length) {
        const product = result.rows[0];
        conn.release();
        return product;
      }

      conn.release();

      // throw error if product not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not find product with the id ${id}`);
    }
  }

  async create(p: ProductType): Promise<ProductType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      // check if product already exists
      const query = "SELECT * FROM products WHERE name=($1)";
      const res = await conn.query(query, [p.name]);
      if (res.rows.length) {
        conn.release();
        throw new Error(`Product ${p.name} already exists`);
      }

      const sql =
        "INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [p.name, p.price, p.category_id]);

      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. ${err}`);
    }
  }

  async createCategory(categoryName: string): Promise<Category> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      // check if category already exists
      const query = "SELECT * FROM categories WHERE name=($1)";
      const res = await conn.query(query, [categoryName]);
      if (res.rows.length) {
        conn.release();
        throw new Error(`Category ${categoryName} already exists`);
      }

      const sql = "INSERT INTO categories (name) VALUES($1) RETURNING *";
      const result = await conn.query(sql, [categoryName]);
      const category = result.rows[0];
      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new category ${categoryName}. ${err}`);
    }
  }

  async getByCategory(category_id: number): Promise<ProductType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE category_id=($1)";

      const result = await conn.query(sql, [category_id]);

      if (result.rows.length) {
        const products = result.rows;
        conn.release();
        return products;
      }

      conn.release();

      // throw error if products not found
      throw new Error();
    } catch (err) {
      throw new Error(`Could not find products for category with the id ${category_id}`);
    }
  }
}
