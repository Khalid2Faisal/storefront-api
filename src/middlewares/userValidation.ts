import { Request, Response, NextFunction } from "express";

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password } = req.body;

  // check if firstname exists
  if (!firstname) {
    return res.status(400).json({
      message: "Error: You must provide 'firstname'",
    });
  }

  // check if lastname exists
  if (!lastname) {
    return res.status(400).json({
      message: "Error: You must provide 'lastname'",
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
  const { firstname, lastname, email, password } = req.body;

  // check that at least one field is provided
  if (!firstname && !lastname && !email && !password) {
    return res.status(400).json({
      message:
        "Error: You must provide at least one field of 'firstname', 'lastname', 'email', 'password' to update",
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
