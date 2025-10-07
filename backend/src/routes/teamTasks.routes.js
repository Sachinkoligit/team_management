import express from "express";
import { getBoards, createBoards } from "../controllers/team.controllers.js";

const router = express.Router();

router.get("/getBoards", getBoards);

router.post("/createBoards", createBoards);

const teamRoutes = router;
export default teamRoutes;
