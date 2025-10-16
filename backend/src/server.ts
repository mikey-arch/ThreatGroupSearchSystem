import express from 'express';
import routes from "./routes/routes.ts";
import { connectDB } from "./config/db.ts";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.ts";
import cors from "cors"; 
import webSearchRoutes from "./routes/websearch.ts";

//load environment from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//enable CORS to allow frontend requests from localhost 5173
app.use(cors({
  origin: "http://localhost:5173",
}));

//middleware
app.use(express.json());
app.use(rateLimiter);

//define API routes
app.use("/api/websearch", webSearchRoutes);
app.use("/api/threatgroups", routes);

//connect to the database, then start up the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: PORT:", PORT);
    });
});
