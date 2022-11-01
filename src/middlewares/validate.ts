import { Request, Response, NextFunction } from "express";

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
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
