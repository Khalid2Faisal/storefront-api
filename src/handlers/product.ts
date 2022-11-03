import express, { Request, Response } from "express";

import {
  validateCreateProduct,
  validateCreateCategory,
} from "../middlewares/productValidation";
import { validateIdParam } from "../middlewares/validate";
import verifyAuthToken from "../middlewares/verifyAuthToken";

import { Product } from "../models/product";

const productModel = new Product();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    return res.json(products);
  } catch (err) {
    let errorMessage = "Failed to get products";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(parseInt(req.params.id, 10));
    return res.json(product);
  } catch (err) {
    let errorMessage = "Failed to get product";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newProduct = await productModel.create(req.body);
    return res.json(newProduct);
  } catch (err) {
    let errorMessage = "Failed to create product";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.body.name;
    const newCategory = await productModel.createCategory(categoryName);
    return res.json(newCategory);
  } catch (err) {
    let errorMessage = "Failed to create category";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await productModel.getByCategory(parseInt(req.params.id, 10));
    return res.json(products);
  } catch (err) {
    let errorMessage = "Failed to get products";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", validateIdParam, show);
  app.post("/products", verifyAuthToken, validateCreateProduct, create);
  app.post("/categories", verifyAuthToken, validateCreateCategory, createCategory);
  app.get("/products/category/:id", validateIdParam, productsByCategory);
};

export default productsRoutes;
