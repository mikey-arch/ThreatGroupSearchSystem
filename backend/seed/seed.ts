import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import ThreatGroup from '../src/models/ThreatGroup.ts';

//Resolve file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function seedDatabase() {
    try {
        //Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        //Clear existing data
        await ThreatGroup.deleteMany({});
        console.log('Cleared existing data');

        //Read seed data from the JSON file
        const dataPath = path.join(__dirname, 'data.json');
        const threatGroups = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        //Insert seed data
        await ThreatGroup.insertMany(threatGroups);
        console.log(`Seeded ${threatGroups.length} threat groups`);

        //Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

//Run seeding function
seedDatabase();
