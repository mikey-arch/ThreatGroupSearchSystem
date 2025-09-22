import mongoose from "mongoose";

const threatGroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        aliases: [{
            type: String,
        }],
        description: {
            type: String,
            required: true,
        },
        sourceOrigin: {
            type: String,   //e.g "MITRE ATT&CK" , "ETDA"
            required: true,
        },
        country: {
            type: String,   //e.g "China", "Russia", "USA"
            required: false,
        },
    },
    { timestamps: true }
);

const ThreatGroup = mongoose.model("ThreatGroup", threatGroupSchema)

export default ThreatGroup;
