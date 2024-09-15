import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Editor from "../EditorMahasiswa";

function TaskDetailPage() {
  const { id_tugas } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const getTugas = async () => {
      try {
        const response = await axios.get(`${API_URL}/tugas/${id_tugas}`);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task details:", error);
      } finally {
        setLoading(false);
      }
    };

    getTugas();
  }, [id_tugas, API_URL]);

  if (loading) {
    return <p>Loading task details...</p>;
  }

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div className="container py-16 px-20">
      <Card className="mt-2 w-full">
        <CardBody>
          <Typography className="mb-2">
            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}{" "}
            {new Date(task.deadline).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography className="mb-6">{task.ket_assigment}</Typography>

          {/* Text Editor for submitting answer */}
          <Editor initialContent="" />

          {/* Optionally, add a submit button or other form controls here */}
        </CardBody>
      </Card>
    </div>
  );
}

export default TaskDetailPage;
