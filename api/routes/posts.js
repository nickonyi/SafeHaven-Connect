import express from "express";
import { } from "../controller/post.js";

const router = express.Router();
router.get("/find/:userId",getUser)

export default router;