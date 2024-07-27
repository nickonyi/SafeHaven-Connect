import express from "express";
import { getUser,updateUser, getUserEvents,registerforEvent,getMyRegisterEvent} from "../controller/user.js";

const router = express.Router();
router.get("/find/:userId",getUser)
router.put("/",updateUser)
router.get('/my-events', getUserEvents);
router.post("/registerforevent", registerforEvent);
router.get("/myregister-event",  getMyRegisterEvent);
export default router;