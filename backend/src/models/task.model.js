import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  priority: { type: String },
  assignedTo: { type: String },
  dueDate: { type: Date, default: Date.now },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
