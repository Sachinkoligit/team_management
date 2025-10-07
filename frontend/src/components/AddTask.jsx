import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

export default function AddTask() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const handleAdd = async () => {
    const { title, description, status, priority, assignedTo, dueDate } =
      taskData;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !assignedTo ||
      !dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `team/getBoard/${boardId}/tasks`,
        taskData
      );
      console.log("Task added:", response.data);

      setTaskData({
        title: "",
        description: "",
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: "",
      });

      navigate(`/tasks/${boardId}`);
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  return (
    <>
      <div>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <div className="form-container">
        <div className="form">
          <h2>Add Task</h2>
          <div className="inform">
            <label>Title</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
          </div>

          <div className="inform">
            <label>Description</label>
            <input
              type="text"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="inform">
            <label>Status</label>
            <select
              value={taskData.status}
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
              required
            >
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>

          <div className="inform">
            <label>Priority</label>
            <input
              type="text"
              value={taskData.priority}
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
              required
            />
          </div>

          <div className="inform">
            <label>Assigned To</label>
            <input
              type="text"
              value={taskData.assignedTo}
              onChange={(e) =>
                setTaskData({ ...taskData, assignedTo: e.target.value })
              }
              required
            />
          </div>

          <div className="inform">
            <label>Due Date</label>
            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              required
            />
          </div>

          <button className="btn" onClick={() => handleAdd()}>
            Add Task
          </button>
        </div>
      </div>
    </>
  );
}
