import express from "express";
import { getPosts,addPost,deletePost,addBlog, getBlogs,getBlogInfo } from "../controller/post.js";

const router = express.Router();
router.get("/", getPosts);
router.post("/", addPost);
router.post("/blog", addBlog);
router.get("/blog", getBlogs);
router.get("/blog/:id", getBlogInfo);
router.delete("/:id", deletePost);

export default router;