import dotenv from "dotenv";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import productsRoutes from "./handlers/product";

/* Loading the environment variables from the .env file. */
dotenv.config();

const app: express.Application = express();
const port: number = (process.env.PORT as unknown as number) || 8080;
const address: string = `http://localhost:${port}`;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productsRoutes(app);

app.listen(process.env.PORT || 3000, function () {
  console.log(`starting app on: ${address}`);
});
