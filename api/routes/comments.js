import express from "express";
import {getComments } from "../controller/comment.js";

const router = express.Router();
router.get("/",getComments);

export default router;