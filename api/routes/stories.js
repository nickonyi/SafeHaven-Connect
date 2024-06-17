import express from "express";
import { getStories, addStory, deleteStory } from "../controller/story.js";

const router = express.Router();

router.get("/", getStories);
router.post("/", addStory);
router.delete("/:id", deleteStory);

export default router;