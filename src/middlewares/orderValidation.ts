import { Request, Response, NextFunction } from "express";

export const validateGetOrder = (req: Request, res: Response, next: NextFunction) => {
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

export const validateCreateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { status, user_id } = req.body;

  // check if status exists
  if (!status) {
    return res.status(400).json({
      message: "Error: You must provide 'status'",
    });
  }

  // check if status is a string
  const stringRegex = /^[\w\s]+$/;
  if (!stringRegex.test(status)) {
    return res.status(400).json({
      message: "status must be a string",
    });
  }

  // status must be either "active" or "complete"
  if (status !== "active" && status !== "complete") {
    return res.status(400).json({
      message: "status must be either 'active' or 'complete'",
    });
  }

  // check if user_id exists
  if (!user_id) {
    return res.status(400).json({
      message: "Error: You must provide 'user_id'",
    });
  }

  // check if user_id is a number
  const numberRegex = /^-?\d+$/;
  if (!numberRegex.test(user_id)) {
    return res.status(400).json({
      message: "user_id must be numerical",
    });
  }

  // check if user_id is a positive number
  if (Number(user_id) < 0) {
    return res.status(400).json({
      message: "user_id must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};

export const validateUserOrderStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.body;

  // check if user_id exists
  if (!user_id) {
    return res.status(400).json({
      message: "Error: You must provide 'user_id'",
    });
  }

  // check if user_id is a number
  const numberRegex = /^-?\d+$/;
  if (!numberRegex.test(user_id)) {
    return res.status(400).json({
      message: "user_id must be numerical",
    });
  }

  // check if user_id is a positive number
  if (Number(user_id) < 0) {
    return res.status(400).json({
      message: "user_id must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};

export const validateDeleteOrder = (req: Request, res: Response, next: NextFunction) => {
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

export const validateAddProductToOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { quantity, product_id } = req.body;

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

  // check if quantity exists
  if (!quantity) {
    return res.status(400).json({
      message: "Error: You must provide 'quantity'",
    });
  }

  // check if quantity is a number
  const numberRegex = /^-?\d+$/;
  if (!numberRegex.test(quantity)) {
    return res.status(400).json({
      message: "quantity must be numerical",
    });
  }

  // check if quantity is a positive number
  if (Number(quantity) < 0) {
    return res.status(400).json({
      message: "quantity must be a positive number",
    });
  }

  // check if product_id exists
  if (!product_id) {
    return res.status(400).json({
      message: "Error: You must provide 'product_id'",
    });
  }

  // check if product_id is a number
  const numberRegex2 = /^-?\d+$/;
  if (!numberRegex2.test(product_id)) {
    return res.status(400).json({
      message: "product_id must be numerical",
    });
  }

  // check if product_id is a positive number
  if (Number(product_id) < 0) {
    return res.status(400).json({
      message: "product_id must be a positive number",
    });
  }

  // continue to the next middleware
  return next();
};
