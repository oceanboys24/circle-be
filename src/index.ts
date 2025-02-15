import express, { Express, Request, Response, Router } from "express";
import UserRoute from "./routes/user_route";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Endpoint
app.use("/users", UserRoute);

// Run App
app.listen(port, () => {
  console.log("Running On Port", port);
});
