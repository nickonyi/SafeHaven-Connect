import express from "express";
import { getOnlineUsers} from "../controller/lastActive.js";


const router = express.Router();

router.get('/online-users',getOnlineUsers)


export default router;