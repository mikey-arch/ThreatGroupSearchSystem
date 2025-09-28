import express from "express"
import { getThreatGroupByCanonicalName , getThreatGroupById} from "../controllers/controller.ts";

const router = express.Router();

router.get("/:canonicalName", getThreatGroupByCanonicalName); 
router.get("/:id", getThreatGroupById); 

export default router;




