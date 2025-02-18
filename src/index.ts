import express, { Express } from "express";
import v1Router from "./routes/v1";

require("dotenv").config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Endpoint API V1
app.use('/v1', v1Router)

// Run App
app.listen(port, () => {
  console.log("Running On Port", port);
});
