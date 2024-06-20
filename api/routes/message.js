import express from "express";
import { newMessage,getMessage } from "../controller/message.js";



const router = express.Router();

router.post("/",newMessage);
router.get("/:conversationId",getMessage);


export default router;