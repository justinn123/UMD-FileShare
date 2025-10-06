import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT;

console.log(PORT);