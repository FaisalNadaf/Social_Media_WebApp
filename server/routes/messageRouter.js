/** @format */

import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/sendMessage.js";

const router = express.Router();

router.get("/:id", userAuth, getMessages);
router.post("/send/:id", userAuth, sendMessage);

export default router;
