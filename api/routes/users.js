import express from "express";
import { getUser,updateUser, getUserEvents} from "../controller/user.js";

const router = express.Router();
router.get("/find/:userId",getUser)
router.put("/",updateUser)
router.get('/my-events', getUserEvents);

export default router;