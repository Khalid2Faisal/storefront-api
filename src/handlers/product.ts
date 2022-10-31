import express, { Request, Response } from "express";
import { ProductsTable } from "../models/product";

const productsTable = new ProductsTable();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productsTable.index();
    return res.json(products);
  } catch (err) {
    let errorMessage = "Failed to get products";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
};

export default productsRoutes;
