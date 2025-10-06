import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        dbName: "test" //db name
        });
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("Error connecting to MONGODB", error);
        process.exit(1);
    }
}
