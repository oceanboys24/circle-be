import express, { Express, Request, Response, Router } from "express";
import UserRoute from "./routes/user_route";
import AuthRoute from "./routes/auth_route";
import ProfileRoute from "./routes/profile_route";
import ThreadRoute from "./routes/thread_route";
import LikesRoute from "./routes/like_route";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Endpoint
app.use("/users", UserRoute);
app.use("/auth", AuthRoute);
app.use("/profile", ProfileRoute);
app.use("/threads", ThreadRoute);
app.use("/likes", LikesRoute);

// Run App
app.listen(port, () => {
  console.log("Running On Port", port);
});
