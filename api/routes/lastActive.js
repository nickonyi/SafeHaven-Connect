import express from "express";
import { updateLastActive,getOnlineUsers} from "../controller/lastActive.js";


const router = express.Router();
router.put("/",updateLastActive)
router.get('/online-users',getOnlineUsers)


export default router;