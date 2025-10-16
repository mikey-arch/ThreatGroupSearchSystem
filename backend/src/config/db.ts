import mongoose from "mongoose"

//connect to MongoDB using Mongoose
export const connectDB = async () => {
    try {
        //attempt connection 
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        //log connection errors and exit the process
        console.error("Error connecting to MONGODB", error);
        process.exit(1);
    }
}
