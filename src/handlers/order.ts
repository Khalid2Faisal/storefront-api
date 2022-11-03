import express, { Request, Response } from "express";

import {
  validateCreateOrder,
  validateUserOrderStatus,
  validateAddProductToOrder,
} from "../middlewares/orderValidation";
import { validateIdParam } from "../middlewares/validate";
import verifyAuthToken from "../middlewares/verifyAuthToken";

import { Order } from "../models/order";

const orderModel = new Order();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.index();
    return res.json(orders);
  } catch (err) {
    let errorMessage = "Failed to get orders";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.show(parseInt(req.params.id, 10));
    return res.json(order);
  } catch (err) {
    let errorMessage = "Failed to get order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderModel.create(req.body);
    return res.json(newOrder);
  } catch (err) {
    let errorMessage = "Failed to create order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const currentUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.currentOrdersByUser(req.body.user_id);
    return res.json(orders);
  } catch (err) {
    let errorMessage = "Failed to get current orders";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const completedUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.completedOrdersByUser(req.body.user_id);
    return res.json(orders);
  } catch (err) {
    let errorMessage = "Failed to complete orders";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await orderModel.delete(parseInt(req.params.id, 10));
    return res.json(deletedOrder);
  } catch (err) {
    let errorMessage = "Failed to delete order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderProduct = await orderModel.addProduct(
      parseInt(req.params.id, 10),
      req.body
    );
    return res.json(orderProduct);
  } catch (err) {
    let errorMessage = "Failed to add product to order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, validateIdParam, show);
  app.post("/orders", verifyAuthToken, validateCreateOrder, create);
  app.post(
    "/orders/current",
    verifyAuthToken,
    validateUserOrderStatus,
    currentUserOrders
  );
  app.post(
    "/orders/completed",
    verifyAuthToken,
    validateUserOrderStatus,
    completedUserOrders
  );
  app.delete("/orders/:id", verifyAuthToken, validateIdParam, deleteOrder);
  app.post(
    "/orders/:id/products",
    verifyAuthToken,
    validateIdParam,
    validateAddProductToOrder,
    addProduct
  );
};

export default orderRoutes;
