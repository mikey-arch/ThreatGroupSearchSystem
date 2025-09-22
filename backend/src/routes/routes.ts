import express from "express"
import { getAllThreatGroups , getThreatGroupById} from "../controllers/controller.ts";

const router = express.Router();

router.get("/", getAllThreatGroups); 
router.get("/:id", getThreatGroupById); 

export default router;




