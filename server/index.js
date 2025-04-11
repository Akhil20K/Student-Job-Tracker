import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import applicationRouter from "./routes/applicationRoute.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.URI)
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());

app.use('/', applicationRouter);

app.listen(process.env.PORT, (err) => {
    if(err){
        console.log(err);
    } else{
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    }
})