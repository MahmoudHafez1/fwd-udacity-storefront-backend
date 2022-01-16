import express, { Request, Response } from "express";

import auth from "./middleware/auth";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await store.show(id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: Number(req.body.price),
    category: req.body.category,
  };
  const newProduct = await store.create(product);
  res.json(newProduct);
};

const productRoutes = (app: express.Application) => {
  app.get("/product", index);
  app.get("/product/:id", show);
  app.post("/product", auth, create);
};

export default productRoutes;
