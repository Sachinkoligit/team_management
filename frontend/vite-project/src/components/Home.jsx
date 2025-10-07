import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  //   const navigate = useNavigate();
  const [Boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [updateBoard, setUpdateBoard] = useState(false);
  const [boardId, setBoardId] = useState("");
  const [taskstatus, setTaskstatus] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState({});
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
      console.log(id);
      const data = await axiosInstance.get(`getBoard/${taskId}/tasks`);
      setTask(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatenewboard = async () => {
    try {
      console.log(newBoardName);
      await axiosInstance.put(`team/update/${boardId}`, { name: newBoardName });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateBoard(false);
      getBoards();
    }
  };

  useEffect(() => {
    getBoards();
    getTask();
  }, []);

  return (
    <div className="home">
      {Boards.map((board) => {
        return (
          <div
            className="card"
            key={board._id}
            onClick={() => {
              setTaskstatus(true);
              setTaskId(board._id);
            }}
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
          </div>
        );
      })}

      {updateBoard && (
        <div>
          <h2>Update Board Name</h2>
          <label>Board Name</label>
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <button onClick={() => updatenewboard()}>Update</button>
        </div>
      )}

      {taskstatus && <div></div>}
    </div>
  );
}
