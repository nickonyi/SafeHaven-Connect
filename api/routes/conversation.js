import express from "express";
import {newConversation,getConversation,getTwoConversations} from "../controller/conversation.js";

const router = express.Router();

router.post("/", newConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId",getTwoConversations)
export default router;