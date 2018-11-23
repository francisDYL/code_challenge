import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import session from 'express-session';
//import flash from 'express-flash';
import cors from "cors";
import passport from 'passport';
import mongoose from "mongoose";
import {corsOptions} from "./config/cors.config";
import {MONGO_URI} from "./config/database.config";
import authRoutes from "./routes/authentication";
import shopsRoutes from './routes/shops';

const app =  express();

mongoose.connect(MONGO_URI, {useMongoClient: true}).then(
    () => { 
        console.log("connection to database established");
    }).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running.  ${err}`);
});

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'challenge', resave: true, saveUninitialized: true}));
app.use(cors(corsOptions));
//app.use(flash);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(shopsRoutes);

app.get("/",(req:Request,res:Response)=>{
    res.send("welcome");
});


export default app;