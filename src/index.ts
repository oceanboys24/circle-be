import express, { Express, Request, Response } from "express";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT


app.get('/',(req: Request, res:Response) => {
    res.send("Hello World")
}) 

app.listen(port, () => {
    console.log("Server Running On Port", port)
})
