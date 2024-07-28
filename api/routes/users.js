import express from "express";
import { getUser,updateUser, getUserEvents,registerforEvent,getMyRegisterEvent, userregisterforMyEvent} from "../controller/user.js";

const router = express.Router();
router.get("/find/:userId",getUser)
router.put("/",updateUser)
router.get('/my-events', getUserEvents);
router.post("/registerforevent", registerforEvent);
router.get("/myregister-event",  getMyRegisterEvent);
router.get("/users-registered-for-my-event/:eventId", userregisterforMyEvent)
export default router;