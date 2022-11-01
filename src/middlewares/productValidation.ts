import { Request, Response, NextFunction } from "express";

export const validateGetProduct = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // check if id exists
  if (!id) {
    return res.status(400).json({
      message: "Error: You must provide 'id'",
    });
  }

  // check if id is a number
  const regex = /^-?\d+$/;
  if (!regex.test(id)) {
    return res.status(400).json({
      message: "id parametermust be numerical",
    });
  }

  // check if id is a positive number
  if (Number(id) < 0) {
    return res.status(400).json({
      message: "id parameter must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};

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

  // continue to the next middleware
  return next();
};

export const validateGetProductsByCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // check if category_id exists
  if (!id) {
    return res.status(400).json({
      message: "Error: You must provide 'id' parameter",
    });
  }

  // check if category_id is a number
  const regex = /^-?\d+$/;
  if (!regex.test(id)) {
    return res.status(400).json({
      message: "category_id parameter must be numerical",
    });
  }

  // check if category_id is a positive number
  if (Number(id) < 0) {
    return res.status(400).json({
      message: "category_id parameter must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};
