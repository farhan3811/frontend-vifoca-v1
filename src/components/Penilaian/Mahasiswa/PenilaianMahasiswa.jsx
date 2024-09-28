import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Editor from "../../EditorMahasiswa";
import Calculator from "../../Calculator";
import { ThreeDot } from "react-loading-indicators";

function App() {
  const { penilaianId } = useParams();
  const { id_tugas } = useParams();
  const [penilaian, setPenilaian] = useState(null);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${API_URL}/me`);
        setUserRole(response.data.role);
      } catch (error) {
      }
    };

    fetchUserRole();
  }, [API_URL]);
  useEffect(() => {
    const getTugas = async () => {
      try {
        const response = await axios.get(`${API_URL}/tugas `);
        setTask(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getTugas();
  }, [id_tugas, API_URL]);

  useEffect(() => {
    const getPenilaian = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${API_URL}/penilaian/${penilaianId}`);
        setPenilaian(response.data);
      } catch (error) {
        console.error(error); // Log the error for debugging
      } finally {
        setLoading(false); // Always set loading to false
      }
    };    
    getPenilaian();
  }, [penilaianId]);

  const handleSave = async () => {
    setSubmitLoading(true);
    try {
      await axios.patch(`${API_URL}/penilaian/${penilaianId}`, penilaian);
      setShowSuccessModal(true);
    } catch (error) {
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditorChange = (content) => {
    setPenilaian((prevPenilaian) => ({
      ...prevPenilaian,
      answer: content,
    }));
  };

  const handleKetPenilaianChange = (event) => {
    setPenilaian((prevPenilaian) => ({
      ...prevPenilaian,
      ket_penilaian: event.target.value,
    }));
  };

  const handleFormPenilaianChange = (event) => {
    setPenilaian((prevPenilaian) => ({
      ...prevPenilaian,
      form_penilaian: event.target.value,
    }));
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

  const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-50">
        <button
          onClick={onClose}
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
        <Typography className="text-center text-green-600 font-medium">
          Penilaian berhasil disimpan!
        </Typography>
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
                {task.foto_tugas ? (
                  <img
                    src={`${API_URL}/${task.foto_tugas}`}
                    className="w-full h-full cursor-pointer"
                    alt="Tugas Icon"
                    onClick={handleZoom}
                  />
                ) : (
                  <Typography className="text-center text-gray-500">
                    Foto tugas tidak ada
                  </Typography>
                )}
              </div>
            </div>
          </div>
          <div>
            <Typography className="text-white mt-10 mr-4">
              {penilaian?.tuga?.ket_assigment}
            </Typography>
          </div>
        </div>
        <CardBody>
          <div className="flex flex-nowrap items-center">
            <div>
              <Typography className="mb-2 bg-sulit text-white font-title font-medium px-10 py-2 rounded">
                <td>
                  {penilaian?.tuga.deadline
                    ? new Date(penilaian?.tuga.deadline).toLocaleString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
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

          {showSuccessModal && (
            <SuccessModal onClose={() => setShowSuccessModal(false)} />
          )}

          <Editor
            initialContent={penilaian?.answer || ""}
            className="z-10"
            onChange={handleEditorChange}
          />
          <div className="flex gap-4 mt-6 mb-6">
            <div className="grow h-14">
              <Typography>Catatan :</Typography>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full border-gray-300 disabled:border-gray-400 disabled:bg-white bg-white"
                value={penilaian?.ket_penilaian || ""}
                onChange={handleKetPenilaianChange}
                disabled={userRole === "mahasiswa"}
              ></textarea>
            </div>
            <div className="flex-none w-78 h-14">
              <Typography>Nilai</Typography>
              <textarea
                type="number"
                className="textarea textarea-bordered textarea-lg w-full border-gray-300 disabled:border-gray-400 disabled:bg-white bg-white"
                value={penilaian?.form_penilaian || ""}
                onChange={handleFormPenilaianChange}
                disabled={userRole === "mahasiswa"}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-24">
            <button
              className="btn bg-blue text-white font-title font-medium px-28 border-none"
              onClick={handleSave}
              disabled={submitLoading}
            >
              {submitLoading ? "Mengirim..." : "Selesai"}
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
              className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl"
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
