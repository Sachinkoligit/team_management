import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import "./Home.scss";

export default function Home() {
  const [Boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [updateBoard, setUpdateBoard] = useState(false);
  const [boardId, setBoardId] = useState("");
  const [taskstatus, setTaskstatus] = useState(false);
  const [getTasks, setGetTasks] = useState([]);
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const getBoards = async () => {
    try {
      const boardsData = await axiosInstance.get("team/getBoards");
      setBoards(boardsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const data = await axiosInstance.get(`team/getBoard/${id}/tasks`);
      setGetTasks(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!boardId) {
      console.warn("Board ID is missing");
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
      setTaskstatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updatenewboard = async () => {
    try {
      await axiosInstance.put(`team/update/${boardId}`, { name: newBoardName });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateBoard(false);
      setNewBoardName("");
      getBoards();
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div className="home">
      {Boards.map((board) => (
        <div
          className="card"
          key={board._id}
          onClick={() => {getTask(board._id);setTaskstatus(true)}}
        >
          <h2>{board.name}</h2>
          <button
            onClick={() => {
              setUpdateBoard(true);
              setBoardId(board._id);
            }}
          >
            Update Board Name
          </button>
          <button
            onClick={() => {
              setTaskstatus(true);
              setBoardId(board._id);
            }}
          >
            Add Task
          </button>
        </div>
      ))}

      {updateBoard && (
        <div>
          <h2>Update Board Name</h2>
          <label>Board Name</label>
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button onClick={updatenewboard}>Update</button>
        </div>
      )}

      {taskstatus && (
        <div>
          <h2>Add Task</h2>
          <label>Title</label>
          <input
            type="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />

          <label>Description</label>
          <input
            type="text"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />

          <label>Status</label>
          <input
            type="text"
            value={taskData.status}
            onChange={(e) =>
              setTaskData({ ...taskData, status: e.target.value })
            }
          />

          <label>Priority</label>
          <input
            type="text"
            value={taskData.priority}
            onChange={(e) =>
              setTaskData({ ...taskData, priority: e.target.value })
            }
          />

          <label>Assigned To</label>
          <input
            type="text"
            value={taskData.assignedTo}
            onChange={(e) =>
              setTaskData({ ...taskData, assignedTo: e.target.value })
            }
          />

          <label>Due Date</label>
          <input
            type="date"
            value={taskData.dueDate}
            onChange={(e) =>
              setTaskData({ ...taskData, dueDate: e.target.value })
            }
          />

          <button onClick={addTask}>Add Task</button>
        </div>
      )}

      {taskstatus && }
    </div>
  );
}
