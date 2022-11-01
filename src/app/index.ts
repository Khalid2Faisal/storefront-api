import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import orderRoutes from "../handlers/order";
import productsRoutes from "../handlers/product";
import userRoutes from "../handlers/user";

/* Loading the environment variables from the .env file. */
dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// set routes
productsRoutes(app);
userRoutes(app);
orderRoutes(app);

export default app;
