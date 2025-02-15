import express, { Express, Request, Response, Router } from "express";
import UserRoute from "./routes/user_route";
import AuthRoute from "./routes/auth_route";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Endpoint
app.use("/users", UserRoute);
app.use("/auth", AuthRoute)

// Run App
app.listen(port, () => {
  console.log("Running On Port", port);
});
