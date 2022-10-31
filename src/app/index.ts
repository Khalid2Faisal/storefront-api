import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import productsRoutes from "../handlers/product";

/* Loading the environment variables from the .env file. */
dotenv.config();

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// set routes
productsRoutes(app);

export default app;
