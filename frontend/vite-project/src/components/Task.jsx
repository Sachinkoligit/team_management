import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

export default function Task() {
  const { id } = useParams();
  const [task, setTask] = useState({});

  const getTask = async () => {
    try {
      console.log(id);
      await axiosInstance.get(`getBoard/${id}/tasks`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);
  return <div>{console.log(task)}</div>;
}
