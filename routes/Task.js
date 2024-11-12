import express from "express";
const taskRoutes = express.Router();
import {
  getAllTasks,
  createTask,
  getSingleTask,
  editTask,
  deleteTask,
} from "../controllers/Task.js";

taskRoutes.get("/", getAllTasks);
taskRoutes.get("/:id", getSingleTask);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", editTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
