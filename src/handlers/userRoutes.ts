import express, { Request, Response } from "express";

import { User, UserStore } from "../models/user";
import auth from "./middleware/auth";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await store.show(id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    pass: req.body.pass,
  };
  const newUser = await store.create(user);
  res.json(newUser);
};

const userRoutes = (app: express.Application) => {
  app.get("/user", auth, index);
  app.get("/user/:id", auth, show);
  app.post("/user", auth, create);
};

export default userRoutes;
