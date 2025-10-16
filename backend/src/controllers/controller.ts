import ThreatGroup from "../models/ThreatGroup.ts"

//get all threat groups
export const getAllThreatGroups = async (req, res) => {
    try {
        const groups = await ThreatGroup.find();
        res.json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Search for matches in canonicalName, aliases, tags, country, externalIds, and description
export async function searchThreatGroups(req, res) {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Search query is required" });

        // First, get canonical name matches
        const canonicalMatches = await ThreatGroup.find({
            canonicalName: { $regex: query, $options: 'i' }
        })
        .sort({ canonicalName: 1 })
        .limit(20);

        // Then get other matches (aliases, tags, etc.) excluding canonical name matches
        const canonicalIds = canonicalMatches.map(g => g._id);
        const otherMatches = await ThreatGroup.find({
            _id: { $nin: canonicalIds },
            $or: [
                { 'aliases.name': { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { country: { $regex: query, $options: 'i' } },
                { 'externalIds.id': { $regex: query, $options: 'i' } },
                { 'externalIds.group_id': { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        .sort({ canonicalName: 1 })
        .limit(20 - canonicalMatches.length);

        // Combine: canonical matches first, then others
        const threatGroups = [...canonicalMatches, ...otherMatches];

        res.status(200).json(threatGroups);
    } catch (error) {
        console.error("Error in searchThreatGroups controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

//Get a single threat group by its canonical name
export async function getThreatGroupByCanonicalName(req, res) {
    try {
        const { canonicalName } = req.params;
        const threatGroup = await ThreatGroup.findOne({ canonicalName });
        if(!threatGroup) return res.status(404).json({ message:"Threat group not found"});
        res.status(200).json(threatGroup);
    } catch (error) {
        console.error("Error in getThreatGroupByCanonicalName controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

//Get a single threat group by its MongoDB ID
export async function getThreatGroupById(req, res) {
    try {
        const threatgroup = await ThreatGroup.findById(req.params.id)
        if(!threatgroup) return res.status(404).json({message:"Threat Group not found"})
        res.json(threatgroup);
    } catch (error) {
        console.error("Error in getThreatGroupById controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}
