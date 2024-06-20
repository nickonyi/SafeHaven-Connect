import express from "express";
import {newConversation,getConversation} from "../controller/conversation.js";

const router = express.Router();

router.post("/", newConversation);
router.get("/:userId", getConversation);
export default router;