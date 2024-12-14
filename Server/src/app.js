import express, { json } from "express" 
import cors from "cors"
import cookieparser from "cookie-parser"
import { newsLetterCron } from "../automation/newsLetterCron.js"

const app = express() 

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Use the .env value or default to localhost:5173
    credentials: true, // Allow cookies to be sent with requests
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieparser());


// routes import
import UserRouter from "./routes/user.routes.js"
import JobRouter from "./routes/job.routes.js"
import ApplicationRouter from "./routes/application.routes.js"

// routes decliration 
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/job", JobRouter)
app.use("/api/v1/application", ApplicationRouter)

newsLetterCron()

export default app