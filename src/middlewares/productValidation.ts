import { Request, Response, NextFunction } from "express";

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, category_id } = req.body;

  // check if name exists
  if (!name) {
    return res.status(400).json({
      message: "Error: You must provide 'name'",
    });
  }

  // check if price exists
  if (!price) {
    return res.status(400).json({
      message: "Error: You must provide 'price'",
    });
  }

  // check if price is a number
  const numberRegex = /^-?\d+$/;
  if (!numberRegex.test(price)) {
    return res.status(400).json({
      message: "price must be numerical",
    });
  }

  // check if price is a positive number
  if (Number(price) < 0) {
    return res.status(400).json({
      message: "price must be a positive number",
    });
  }

  // check if category_id exists
  if (!category_id) {
    return res.status(400).json({
      message: "Error: You must provide 'category_id'",
    });
  }

  // check if category_id is a number
  if (!numberRegex.test(category_id)) {
    return res.status(400).json({
      message: "category_id parameter must be numerical",
    });
  }

  // check if category_id is a positive number
  if (Number(category_id) < 0) {
    return res.status(400).json({
      message: "category_id parameter must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};

export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  // check if name exists
  if (!name) {
    return res.status(400).json({
      message: "Error: You must provide 'name'",
    });
  }

  // name must be a string
  if (typeof name !== "string") {
    return res.status(400).json({
      message: "name must be a string",
    });
  }

  // continue to the next middleware
  return next();
};
