import express from "express"
import { searchThreatGroups, getThreatGroupByCanonicalName, getThreatGroupById, getAllThreatGroups} from "../controllers/controller.ts";
import ThreatGroup from "../models/ThreatGroup.ts";

const router = express.Router();

router.get("/", getAllThreatGroups); 
router.get("/id/:id", getThreatGroupById);
router.get("/search", searchThreatGroups);

//Get list of unique countries
router.get("/countries", async (req, res) => {
  try {
    const countries = await ThreatGroup.distinct("country");
    //remove null or empty values
    const filtered = countries.filter(c => c);
    res.json(filtered.map(c => ({ country: c })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
});

//Get all threat groups from a specific country
router.get("/bycountry/:country", async (req, res) => {
  try {
    const { country } = req.params;

    //Find all threat groups with specified country
    const groups = await ThreatGroup.find({ country });

    if (groups.length === 0) {
      return res.status(404).json({ message: "No threat groups found for this country" });
    }

    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch threat groups for this country" });
  }
});

//Get threat groups by Canonical name 
router.get("/:canonicalName", getThreatGroupByCanonicalName);

export default router;




