import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Model from "./components/Model";
import Task from "./components/Task";
import UpdateTask from "./components/UpdateTask";
import AddTask from "./components/AddTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/:boardId" element={<Task />} />
      <Route path="/addTask/:boardId" element={<AddTask />} />
      <Route path="/updateTasks/:boardId/:taskId" element={<UpdateTask />} />
    </Routes>
  );
}

export default App;
