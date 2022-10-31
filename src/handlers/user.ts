import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import verifyAuthToken from "../middlewares/verifyAuthToken";
import { User } from "../models/user";

const userModel = new User();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    return res.json(users);
  } catch (err) {
    let errorMessage = "Failed to get users";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(req.params.id);
    return res.json(user);
  } catch (err) {
    let errorMessage = "Failed to get user";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newUser = await userModel.create(req.body);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    return res.json(token);
  } catch (err) {
    let errorMessage = "Failed to create user";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await userModel.authenticate(req.body);
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    return res.json(token);
  } catch (err) {
    let errorMessage = "Failed to authenticate user";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user = await userModel.update(req.params.id, req.body);
    return res.json(user);
  } catch (err) {
    let errorMessage = "Failed to update user";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const user = await userModel.delete(req.params.id);
    return res.json(user);
  } catch (err) {
    let errorMessage = "Failed to delete user";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
  app.patch("/users/:id", verifyAuthToken, update);
  app.delete("/users/:id", verifyAuthToken, remove);
};

export default userRoutes;
