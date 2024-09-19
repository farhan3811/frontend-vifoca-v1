import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ThreeDot } from "react-loading-indicators";

import { Link, useParams } from "react-router-dom";

const Loading = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="flex flex-col items-center">
    <ThreeDot variant="bounce" color="#10487A" size="large" text="Vifoca" textColor="#NaNNaNNaN" />
    </div>
  </div>
);

export function CardDefault() {
  const [open, setOpen] = React.useState(1);
  const [tugas, setTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { materi_id } = useParams();
  const [materi, setMateri] = useState(null);

  useEffect(() => {
    getTugasByMateri();
    getMateri();
  }, []);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  const getTugasByMateri = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/materi/${materi_id}/tugas`);
      setTugas(response.data.tugas);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMateri = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/materi/${materi_id}`);
      setMateri(response.data);
    } catch (error) {
      console.error("Failed to fetch materi details:", error);
    }
  };

  const getDefaultAvatar = () => {
    return "https://via.placeholder.com/150";
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const getYouTubeID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|.*[?&]vi=)?([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Sulit":
        return "bg-sulit";
      case "Sedang":
        return "bg-sedang";
      case "Mudah":
        return "bg-mudah";
      default:
        return "bg-gray-500";
    }
  };

  const currentDate = new Date();

  if (loading) {
    return (
      <div className="container py-16 px-20 bg-ground flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container py-16 px-20 bg-ground">
      {materi && (
        <Card className="w-full flex items-center justify-center py-6 px-6">
          <img
            src={
              materi.img_materi
                ? `${API_URL}/api/${materi.img_materi}`
                : getDefaultAvatar()
            }
            className="flex items-center justify-between"
            width={150}
            alt={materi.name_materi || "Materi image"}
          />
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 mt-2 font-title"
          >
            {materi.name_materi}
          </Typography>
          <Typography className="text-center font-title">
            {materi.ket_materi}
          </Typography>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          {materi && materi.vid_materi && (
            <Card className="mt-6 h-96">
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-medium font-title"
                >
                  Tutorial
                </Typography>
              </CardBody>
              <Typography className="flex justify-center items-center rounded-md">
                <iframe
                  width="560"
                  height="280"
                  src={`https://www.youtube.com/embed/${getYouTubeID(materi.vid_materi)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Typography>
            </Card>
          )}
        </div>

        <div>
          <Card className="mt-6 h-96 overflow-y-auto">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium font-title"
              >
                Latihan
              </Typography>
            </CardBody>
            <div className="px-8">
              {tugas
                .filter((task) => new Date(task.deadline) >= currentDate) // Filter tasks by deadline
                .map((task, index) => (
                  <Accordion
                    key={task.id}
                    open={open === index + 1}
                    className="mb-2 rounded border border-blue-gray-100 px-4"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <AccordionHeader
                          onClick={() => handleOpen(index + 1)}
                          className={`border-b-0 font-title text-sm transition-colors ${
                            open === index + 1
                              ? "text-black hover:!text-blue-700"
                              : ""
                          }`}
                        >
                          {task.nama_soal}
                        </AccordionHeader>
                      </div>
                      <div className="flex justify-end items-center mr-6">
                        <button className={`btn btn-sm font-title font-medium text-white ${getStatusClass(task.status_level)}`}>
                          {task.status_level}
                        </button>
                      </div>
                      <div className="flex justify-end items-center">
                        <Link to={`/tugas/${task.id}`}>
                          <button className="btn btn-sm px-10 bg-blue font-title font-medium text-white">
                            Kerjakan
                          </button>
                        </Link>
                      </div>
                    </div>
                    <AccordionBody className="pt-0 text-base font-title">
                      {task.ket_assigment}
                      <div className="flex flex-row justify-end mt-4">
                        <div className="mr-4 border-2 px-2 py-1 rounded-full text-xs">{task.user?.name}</div>
                        <div className=" border-2 px-2 py-1 rounded-full text-xs">
                        <td>
                        {task.deadline
                          ? new Date(task.deadline).toLocaleString(
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
                        </div>
                      </div>
                    </AccordionBody>
                  </Accordion>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CardDefault;
