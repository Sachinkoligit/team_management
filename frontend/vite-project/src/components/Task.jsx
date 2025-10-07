import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

export default function Task() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [task, setTask] = useState([]);

  const getTask = async () => {
    try {
      const data = await axiosInstance.get(`team/getBoard/${boardId}/tasks`);
      setTask(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // "/getBoard/:boardId/tasks/:taskId";
  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`team/getBoard/${boardId}/tasks/${taskId}`);
    } catch (error) {
      console.log(error);
    } finally {
      getTask();
    }
  };

  useEffect(() => {
    getTask();
  }, []);
  return (
    <>
      <div>
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <div className="tasks">
        {task.map((task) => {
          return (
            <div className="task" key={task._id}>
              <div>Title: {task.title}</div>
              <div>Description: {task.description}</div>
              <div>Status: {task.status}</div>
              <div>Priority: {task.priority}</div>
              <div>Assigned To: {task.assignedTo}</div>
              <div>Due Date:{new Date(task.dueDate).toDateString()}</div>
              <button
                onClick={() => navigate(`/updateTasks/${boardId}/${task._id}`)}
              >
                Update
              </button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
