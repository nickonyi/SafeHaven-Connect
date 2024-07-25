import express from "express";
import { creatEvent,updateEvents,deleteEvents} from "../controller/events.js";

const router = express.Router();


router.post("/createEvent", creatEvent);
router.put("/:eventId", updateEvents);
router.delete("/:eventId",deleteEvents);


export default router;