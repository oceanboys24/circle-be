import express, { Express, Request, Response } from "express";
import v1Router from "./routes/v1";
import cors from "cors";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Endpoint API V1
app.use("/v1", v1Router);

// Invalid Request
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});

// Run App
app.listen(port, () => {
  console.log("Running On Port", port);
});
