import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connection.js";
import taskRoutes from "./routes/Task.js";
const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Task Manager!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
