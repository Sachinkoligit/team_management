import express from "express";
import { Connection } from "./src/lib/db.js";
import { configDotenv } from "dotenv";
import teamRoutes from "./src/routes/team.routes.js";
import cors from "cors";

const app = express();

configDotenv();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/team", teamRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.listen(5001, () => {
  console.log("Server Created Successfully");
  Connection();
});
