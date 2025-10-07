import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [Boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [updateBoard, setUpdateBoard] = useState(false);
  const [postBoard, setPostBoard] = useState(false);
  const [boardId, setBoardId] = useState("");

  const getBoards = async () => {
    try {
      const boardsData = await axiosInstance.get("team/getBoards");
      setBoards(boardsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postBoards = async () => {
    try {
      if (!newBoardName) {
        alert("fill the details.");
        return;
      }
      const boardsData = await axiosInstance.post("team/createBoards", {
        name: newBoardName,
      });
      console.log(boardsData);
    } catch (error) {
      console.log(error);
    } finally {
      setPostBoard(false);
      getBoards();
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

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`team/remove/${id}`);
      console.log("Deleted Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      getBoards();
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <div className="board-btn">
        <button onClick={() => setPostBoard(true)}>Add Board</button>
      </div>
      <div className="home">
        {Boards.map((board) => (
          <div
            className="card"
            key={board._id}
            onClick={() => {
              navigate(`/tasks/${board._id}`);
            }}
          >
            <h2>{board.name}</h2>
            <div className="btn-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateBoard(true);
                  setBoardId(board._id);
                }}
              >
                Update Board Name
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/addTask/${board._id}`);
                }}
              >
                Add Task
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(board._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {updateBoard && (
          <div className="form1">
            <h2>Update Board Name</h2>
            <div>
              <label>Board Name</label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </div>
            <button onClick={updatenewboard}>Update</button>
          </div>
        )}

        {postBoard && (
          <div className="form1">
            <h2>Update Board Name</h2>
            <div>
              <label>Board Name</label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
              />
            </div>
            <button onClick={postBoards}>Add</button>
          </div>
        )}
      </div>
    </>
  );
}
