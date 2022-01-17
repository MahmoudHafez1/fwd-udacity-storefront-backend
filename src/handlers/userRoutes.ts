import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User, UserStore } from "../models/user";
import auth from "./middleware/auth";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch {
    throw new Error("something went wrong");
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await store.show(id);
    res.json(user);
  } catch {
    res.status(400);
    res.json("something went wrong");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      pass: req.body.pass,
    };
    const newUser = await store.create(user);
    var token = jwt.sign(
      { id: newUser.id },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch {
    res.status(400);
    res.json("something went wrong");
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/user", auth, index);
  app.get("/user/:id", auth, show);
  app.post("/user", create);
};

export default userRoutes;
