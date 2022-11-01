import { Request, Response, NextFunction } from "express";

export const validateGetUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // check if id exists
  if (!id) {
    res.status(400).json({ message: "Error: You must provide id parameter" });
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

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  // check if firstname exists
  if (!firstName) {
    return res.status(400).json({
      message: "Error: You must provide 'firstName'",
    });
  }

  // check if lastName exists
  if (!lastName) {
    return res.status(400).json({
      message: "Error: You must provide 'lastName'",
    });
  }

  // check if email exists
  if (!email) {
    return res.status(400).json({
      message: "Error: You must provide 'email'",
    });
  }

  // create a regex to check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Error: You must provide a valid email",
    });
  }

  // check if password exists
  if (!password) {
    return res.status(400).json({
      message: "Error: You must provide 'password'",
    });
  }

  // check if password is at least 8 characters long
  if (password.length < 8) {
    return res.status(400).json({
      message: "Error: Password must be at least 8 characters long",
    });
  }

  // continue to the next middleware
  return next();
};

export const validateAuthenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  // check if email exists
  if (!email) {
    return res.status(400).json({
      message: "Error: You must provide 'email'",
    });
  }

  // create a regex to check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Error: You must provide a valid email",
    });
  }

  // check if password exists
  if (!password) {
    return res.status(400).json({
      message: "Error: You must provide 'password'",
    });
  }

  // continue to the next middleware
  return next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  // check if id exists
  if (!id) {
    res.status(400).json({ message: "Error: You must provide id parameter" });
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

  // check that at least one field is provided
  if (!firstName && !lastName && !email && !password) {
    return res.status(400).json({
      message:
        "Error: You must provide at least one field of 'firstName', 'lastName', 'email', 'password' to update",
    });
  }

  // if password is provided, check if it is at least 8 characters long
  if (password && password.length < 8) {
    return res.status(400).json({
      message: "Error: Password must be at least 8 characters long",
    });
  }

  // if email is provided, check if it is valid
  if (email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Error: You must provide a valid email",
      });
    }
  }

  // continue to the next middleware
  return next();
};

export const validateRemoveUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // check if id exists
  if (!id) {
    res.status(400).json({ message: "Error: You must provide id parameter" });
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
