import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom"; // Import useParams for route parameters

export function TugasPage() {
  const [tugas, setTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { materi_id } = useParams(); // Get materi_id from URL params

  useEffect(() => {
    getTugasByMateri();
  }, []);
  const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_LOCAL;
  const getTugasByMateri = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/materi/${materi_id}/tugas`);
      setTugas(response.data.tugas); // Ensure it maps correctly
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="container px-20 mb-8">
      <Typography variant="h3" className="mb-6">
        Tasks for Materi #{materi_id}
      </Typography>
      <div className="grid grid-cols-4 gap-8">
        {tugas.map((task) => (
          <Card key={task.id} className="w-72">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {task.nama_soal}
              </Typography>
              <Typography variant="small" color="gray">
                {task.ket_assigment}
              </Typography>
              <Typography color="red" className="mt-4">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TugasPage;
