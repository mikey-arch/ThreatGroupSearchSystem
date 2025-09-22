import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ThreatGroup from '../src/models/ThreatGroup.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await ThreatGroup.deleteMany({});
        console.log('Cleared existing data');

        const dataPath = path.join(__dirname, 'data.json');
        const threatGroups = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        await ThreatGroup.insertMany(threatGroups);
        console.log(`Seeded ${threatGroups.length} threat groups`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

seedDatabase();
