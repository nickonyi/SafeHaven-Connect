import express from "express";
import { getPosts,addPost,deletePost,addBlog, getBlogs } from "../controller/post.js";

const router = express.Router();
router.get("/", getPosts);
router.post("/", addPost);
router.post("/blog", addBlog);
router.get("/blog", getBlogs);
router.delete("/:id", deletePost);

export default router;