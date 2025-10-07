import express from "express";
import {
  getBoards,
  createBoards,
  update,
  remove,
  getBoard,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/team.controllers.js";

const router = express.Router();

router.get("/getBoards", getBoards);

router.get("/getBoard/:id", getBoard);

router.get("/getBoard/:id/tasks", getTask);

router.post("/getBoard/:id/tasks", createTask);

router.put("/getBoard/:boardId/tasks/:taskId", updateTask);

router.delete("/getBoard/:boardId/tasks/:taskId", deleteTask);

router.post("/createBoards", createBoards);

router.put("/update/:id", update);

router.delete("/remove/:id", remove);

const teamRoutes = router;
export default teamRoutes;
