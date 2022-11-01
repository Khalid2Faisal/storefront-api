import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import orderRoutes from "../handlers/order";
import productsRoutes from "../handlers/product";
import userRoutes from "../handlers/user";

/* Loading the environment variables from the .env file. */
dotenv.config();

const app: express.Application = express();

/* A configuration object for the cors middleware. */
const corsOptions = {
  origin: "http://domain.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// set routes
productsRoutes(app);
userRoutes(app);
orderRoutes(app);

export default app;
