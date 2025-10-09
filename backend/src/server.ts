import express from 'express';
import routes from "./routes/routes.ts";
import { connectDB } from "./config/db.ts";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.ts";
import cors from "cors"; 
import webSearchRoutes from "./routes/websearch.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:5173", // your React dev server
}));

// middleware
app.use(express.json());
app.use(rateLimiter);

// routes
app.use("/api/websearch", webSearchRoutes);
app.use("/api/threatgroups", routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: PORT:", PORT);
    });
});
