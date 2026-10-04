import express from "express";

import {
    syncUserController,
    meController
} from "../controllers/auth.controller.js";

import {
    authenticateFirebase
} from "../middleware/firebase-auth.middleware.js";


const router = express.Router();


router.post(
    "/sync",
    authenticateFirebase,
    syncUserController
);


router.get(
    "/me",
    authenticateFirebase,
    meController
);


export default router;