import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { app, server } from "./lib/socket.js";
import path from 'path';

dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

server.listen(PORT, () =>{
    console.log('Server is running on port : ' + PORT);
    connectDB();
});