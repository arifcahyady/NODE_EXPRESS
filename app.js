import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import postRoute from "./routes/posts.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware Cors
app.use(cors());

// Middleware JSON Body Parser
app.use(bodyParser.json());

// ROUTES --------------------------------
app.use('/post', postRoute);

// Connection to MongoDB --------------------------------
mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log("Connected to MongoDB")
);

// server Connection --------------------------------
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));