// import express from 'express';
// import routes from "./routes/routes.ts";
// import { connectDB } from "./config/db.ts";
// import dotenv from "dotenv";
// import rateLimiter from "./middleware/rateLimiter.ts";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// // middleware
// app.use(express.json()); // this middleware will parse JSON bodies: req.body
// app.use(rateLimiter);

// app.use("/api/threatgroups", routes);

// import cors from "cors";

// app.use(cors()); // Allow all origins for dev


// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("Server started on port: PORT:", PORT);
//     });
// });


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

// middleware
app.use(express.json());
app.use(rateLimiter);
app.use("/api/websearch", webSearchRoutes);


// ALLOW FRONTEND ORIGINS //review if this is needed 
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
}));

app.use("/api/threatgroups", routes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port: PORT:", PORT);
    });
});
