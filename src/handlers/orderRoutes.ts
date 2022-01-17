import express, { Request, Response } from "express";

import { Order, OrderStore } from "../models/order";
import auth from "./middleware/auth";

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    order_status: req.body.status,
    products: req.body.products,
  };
  const result = await store.create(order);
  res.json(" order created successfully");
};

const current = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const result = await store.current(user_id);
  res.json(result);
};

const orderRoutes = (app: express.Application) => {
  app.post("/order", auth, create);
  app.get("/order/:user_id", auth, current);
};

export default orderRoutes;
