import Board from "../models/Board.models.js";
import Task from "../models/task.model.js";

export const getBoards = async (req, res) => {
  try {
    const data = await Board.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Board.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } =
      req.body;

    const newData = {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      boardId: id,
    };
    const data = await Task.create(newData);
    res.status(200).json({ message: "Created Successfully" }, data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.find({ boardId: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const data = req.body;
    const data1 = await Task.findByIdAndUpdate(taskId, data);
    res.status(200).json({ message: "updated successfully", data1 });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const data1 = await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "deleted successfully", data1 });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBoards = async (req, res) => {
  try {
    const { name } = req.body;
    await Board.create({ name });
    res.status(200).json({ message: "Created" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Board.findByIdAndUpdate(id, { name: name });
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Board.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
