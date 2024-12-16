import express from "express";
import cors from "cors";
import routes from "./src/index.js";

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL during production
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json());

// API routes
app.use("/api", routes);

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RUNNING ON PORT: ${PORT}`);
});
