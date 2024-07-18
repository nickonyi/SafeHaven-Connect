import express from "express";
import { creatEvent} from "../controller/events.js";

const router = express.Router();


router.post("/createEvent", creatEvent);


export default router;