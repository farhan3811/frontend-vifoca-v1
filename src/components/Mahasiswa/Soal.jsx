import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Editor from "../EditorMahasiswa";
import Calculator from "../Calculator";
import { ThreeDot } from "react-loading-indicators";

function App() {
  const { id_tugas } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContentVisual, setEditorContentVisual] = useState("");
  const [editorContentFormula, setEditorContentFormula] = useState("");
  const [editorContentCalcu, setEditorContentCalcu] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  useEffect(() => {
    const getTugas = async () => {
      try {
        const response = await axios.get(`${API_URL}/tugas/${id_tugas}`);
        setTask(response.data);
        const penilaianResponse = await axios.get(
          `${API_URL}/penilaian/check/${id_tugas}/${userId}`
        );
        setIsSubmitted(penilaianResponse.data.submitted);
      } catch (error) {
        console.error("Failed to fetch task details:", error);
      } finally {
        setLoading(false);
      }
    };

    getTugas();
  }, [id_tugas, userId, API_URL]);

  const handleSelesai = async () => {
    if (isSubmitted) {
      alert("Tugas sudah dikumpulkan");
      return;
    }

    setSubmitLoading(true);
    try {
      const data = {
        tugas_id: id_tugas,
        userId: userId,
        answervisual: editorContentVisual,
        answerformula: editorContentFormula,
        answercalcu: editorContentCalcu,
        form_penilaian: "",
        ket_penilaian: "",
      };

      const response = await axios.post(`${API_URL}/penilaian`, data);

      if (response.status === 201) {
        alert("Jawaban berhasil dikirim!");
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit jawaban:", response);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditorChangeVisual = (content) => {
    setEditorContentVisual(content);
  };

  const handleEditorChangeFormula = (content) => {
    setEditorContentFormula(content);
  };

  const handleEditorChangeCalcu = (content) => {
    setEditorContentCalcu(content);
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
            <div className="card bg-white w-96 m-6">
              <div className="card-body h-56">
                <img
                  src={
                    task.foto_tugas
                      ? `${API_URL}/${task.foto_tugas}`
                      : "getDefaultAvatar()"
                  }
                  className="w-full h-full cursor-pointer"
                  alt="Tugas Icon"
                  onClick={handleZoom}
                />
              </div>
            </div>
          </div>
          <div>
          <Typography className="text-white mt-10 mr-4" dangerouslySetInnerHTML={{ __html: task.ket_assigment }} />
          </div>
        </div>
        <CardBody>
          <div className="flex flex-nowrap items-center">
            <div>
              <Typography className="mb-2 bg-sulit text-white font-title font-medium px-6 py-2 rounded">
                <td>
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </td>
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

          <Card className="mb-6 shadow p-6">
            <Typography className="mb-2 text-black font-title font-medium">
            Visualization
            </Typography>
            <Editor
              initialContent={editorContentVisual}
              className="z-10"
              onChange={handleEditorChangeVisual}
            />
          </Card>
          <Card className="mb-6 shadow p-6">
            <Typography className="mb-2 text-black font-title font-medium">
            Formulation
            </Typography>
            <Editor
              initialContent={editorContentFormula}
              className="z-10"
              onChange={handleEditorChangeFormula}
            />
          </Card>
          <Card className="mb-6 shadow p-6">
            <Typography className="mb-2 text-black font-title font-medium">
              Calculation
            </Typography>
            <Editor
              initialContent={editorContentCalcu}
              className="z-10"
              onChange={handleEditorChangeCalcu}
            />
          </Card>
          <div className="flex justify-end mt-4">
            <button
              className="btn bg-blue text-white font-title font-medium px-28 disabled:bg-blue disabled:text-white"
              onClick={handleSelesai}
              disabled={submitLoading || isSubmitted}
            >
              {submitLoading
                ? "Mengirim..."
                : isSubmitted
                ? "Tugas sudah dikumpulkan"
                : "Selesai"}
            </button>
          </div>
        </CardBody>
      </Card>

      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={
                task.foto_tugas
                  ? `${API_URL}/${task.foto_tugas}`
                  : "getDefaultAvatar()"
              }
              className="max-w-full max-h-screen"
              alt="Zoomed Tugas Icon"
            />
            <button
              onClick={closeZoom}
              className="absolute bg-blue p-1 rounded top-0 right-0 mt-2 mr-2 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
