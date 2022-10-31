import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1] as string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload: string | object = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    return next();
  } catch (err) {
    let errorMessage = "You are not authorized to do this action, you must be logged in";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(401).json({ message: errorMessage });
  }
};

export default verifyAuthToken;
