import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import productRoutes from "./handlers/productRoutes";
import userRoutes from "./handlers/userRoutes";
import orderRoutes from "./handlers/orderRoutes";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});
