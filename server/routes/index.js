import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import postRoute from "./postRoutes.js";
import messageRoute from "./messageRouter.js";

const router = express.Router();

router.use(`/auth`, authRoute); //auth/register
router.use(`/users`, userRoute);
router.use(`/posts`, postRoute);
router.use(`/chat`, messageRoute);

export default router;
