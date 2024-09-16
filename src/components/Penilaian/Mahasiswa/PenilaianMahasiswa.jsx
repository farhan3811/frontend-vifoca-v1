import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Editor from "../../EditorMahasiswa";
import Calculator from "../../Calculator";
import { ThreeDot } from "react-loading-indicators";

function App() {
  const { id_tugas } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    getUsers();
  }, [API_URL]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const getTugas = async () => {
      try {
        const response = await axios.get(`${API_URL}/tugas `);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task details:", error);
      } finally {
        setLoading(false);
      }
    };

    getTugas();
  }, [id_tugas, API_URL]);

  const handleSelesai = async () => {
    setSubmitLoading(true);
    try {
      const data = {
        tugas_id: id_tugas,
        userId: userId,
        answer: editorContent,
        form_penilaian: "",
        ket_penilaian: "",
      };

      const response = await axios.post(`${API_URL}/penilaian`, data);

      if (response.status === 201) {
        alert("Jawaban berhasil dikirim!");
      } else {
        console.error("Failed to submit jawaban:", response);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const Loading = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center">
        <ThreeDot
          variant="bounce"
          color="#10487A"
          size="large"
          text="Vifoca"
          textColor="#NaNNaNNaN"
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container py-16 px-20 bg-ground flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container px-20">
      <Card className="mt-6 w-full my-10">
        <div className="flex flex-row bg-blue py-4">
          <div>
            <div className="card bg-base-100 w-96 m-6">
              <div className="card-body h-56">
                <Typography variant="h5" color="blue-gray">
                  {task.nama_soal}
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography className="text-white mt-10 mr-4">
              {task.ket_assigment}
            </Typography>
          </div>
        </div>
        <CardBody>
          <div className="flex flex-nowrap items-center">
            <div>
              <Typography className="mb-2 bg-sulit text-white font-title font-medium px-10 py-2 rounded">
                {new Date(task.deadline).toLocaleDateString()}{" "}
                {new Date(task.deadline).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </div>
            <div>
              <button
                className="ml-4 mb-2 px-4 py-2 bg-blue text-white rounded font-title font-medium"
                onClick={openModal}
              >
                Calculator
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-50">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Calculator className="z-50" />
              </div>
            </div>
          )}

          <Editor
            initialContent=""
            className="z-10"
            onChange={handleEditorChange}
          />
          <div class="flex gap-4 mt-6 mb-6">
            <div className="grow h-14">
                <Typography>Catatan :</Typography>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>
            <div className="flex-none w-78 h-14">
            <Typography>Nilai</Typography>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-24">
            <button
              className="btn bg-blue text-white font-title font-medium px-28"
              onClick={handleSelesai}
              disabled={submitLoading}
            >
              {submitLoading ? "Mengirim..." : "Selesai"}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
