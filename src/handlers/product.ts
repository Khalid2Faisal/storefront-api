import express, { Request, Response } from "express";
import { Product, ProductsTable } from "../models/user";

const productsTable = new ProductsTable();

const index = async (_req: Request, res: Response) => {
  const products = await productsTable.index();
  res.json(products);
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
};

export default productsRoutes;
