import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Model from "./components/Model";
import Task from "./components/Task";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Task />} />
    </Routes>
  );
}

export default App;
