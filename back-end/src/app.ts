import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import {corsOptions} from "./config/cors.config";

const app =  express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/",(req:Request,res:Response)=>{
    res.send("welcome");
});

export default app;