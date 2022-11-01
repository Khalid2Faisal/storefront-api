import express, { Request, Response } from "express";

import {
  validateGetOrder,
  validateCreateOrder,
  validateUserOrderStatus,
  validateDeleteOrder,
  validateAddProductToOrder,
} from "../middlewares/orderValidation";
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
    return res.status(400).json({ message: errorMessage });
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
    return res.status(400).json({ message: errorMessage });
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
    return res.status(400).json({ message: errorMessage });
  }
};

const currentUserOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.currentOrderByUser(req.body.user_id);
    return res.json(order);
  } catch (err) {
    let errorMessage = "Failed to get current order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
  }
};

const completedUserOrders = async (req: Request, res: Response) => {
  try {
    const order = await orderModel.completedOrdersByUser(req.body.user_id);
    return res.json(order);
  } catch (err) {
    let errorMessage = "Failed to complete order";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ message: errorMessage });
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
    return res.status(400).json({ message: errorMessage });
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
    return res.status(400).json({ message: errorMessage });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, validateGetOrder, show);
  app.post("/orders", verifyAuthToken, validateCreateOrder, create);
  app.post("/orders/current", verifyAuthToken, validateUserOrderStatus, currentUserOrder);
  app.post(
    "/orders/completed",
    verifyAuthToken,
    validateUserOrderStatus,
    completedUserOrders
  );
  app.delete("/orders/:id", verifyAuthToken, validateDeleteOrder, deleteOrder);
  app.post(
    "/orders/:id/products",
    verifyAuthToken,
    validateAddProductToOrder,
    addProduct
  );
};

export default orderRoutes;
