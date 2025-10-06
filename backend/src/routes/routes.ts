import express from "express"
import { searchThreatGroups, getThreatGroupByCanonicalName , getThreatGroupById} from "../controllers/controller.ts";

const router = express.Router();

// router.get("/search", searchThreatGroups);
// router.get("/:canonicalName", getThreatGroupByCanonicalName);
// router.get("/:id", getThreatGroupById);
// Place the more specific route first
router.get("/id/:id", getThreatGroupById);
router.get("/search", searchThreatGroups);
router.get("/:canonicalName", getThreatGroupByCanonicalName);



export default router;




