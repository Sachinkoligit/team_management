import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

export default function UpdateTask() {
  const navigate = useNavigate();
  const { boardId, taskId } = useParams();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const handleUpdate = async () => {

    try {
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
      const data = await axiosInstance.put(
        `team/getBoard/${boardId}/tasks/${taskId}`,
        taskData
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/tasks/${boardId}`);
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
            />
          </div>

          <div className="inform">
            <label>Status</label>
            <select
              value={taskData.status}
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
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
            />
          </div>

          <button className="btn" onClick={() => handleUpdate()}>
            Update Task
          </button>
        </div>
      </div>
    </>
  );
}
