import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";

import {
    errorMiddleware
} from "./middleware/error.middleware.js";


const app = express();


// Get current file/directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());

app.use(express.json());


// Serve test frontend
app.use(
    express.static(
        path.join(__dirname, "../test-frontend")
    )
);


// Health check
app.get("/health", (req, res) => {

    res.json({
        service: "auth-service",
        status: "OK"
    });

});


// Auth routes
app.use(
    "/auth",
    authRoutes
);


// Error middleware
app.use(errorMiddleware);


export default app;