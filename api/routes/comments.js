import express from "express";
import {getComments } from "../controller/comment.js";
import {addComment } from "../controller/comment.js";

const router = express.Router();
router.get("/",getComments);
router.post("/",addComment);

export default router;