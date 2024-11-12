import { createCustomError } from "../customErrors/customError.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Task from "../models/Task.js";

export const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  console.log(req.body);
});

export const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find({});
  if (tasks.length === 0) {
    return next(createCustomError("No Task Found!", 404));
  }
  res.status(200).json({ tasks });
});

export const getSingleTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`No Task Found with the id: ${req.params.id}!`, 404)
    );
  }
  res.status(200).json({ task });
});

export const editTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(`No Task Found with the id: ${req.params.id}!`, 404)
    );
  }
  res.status(201).json({ task });
  console.log(req.body);
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`No Task Found with the id: ${req.params.id}!`, 404)
    );
  }
  res.status(200).send("Task deleted successfully!");
});
