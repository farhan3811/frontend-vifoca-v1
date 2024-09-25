import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

export function CardDefault({ userId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [penilaians, setPenilaians] = useState([]);
  const [materiMap, setMateriMap] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const getPenilaian = async () => {
      try {
        const response = await axios.get(`${API_URL}/penilaian`, {
          params: {
            page: currentPage,
            limit: 4,
            search: searchTerm,
            userId,
          },
        });
        setPenilaians(response.data.penilaian);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching penilaians:", error);
      }
    };

    const getMateri = async () => {
      try {
        const response = await axios.get(`${API_URL}/materi`);
        const materiData = response.data.materi.reduce((map, materi) => {
          map[materi.id] = {
            name: materi.name_materi,
            img: materi.img_materi,
          };
          return map;
        }, {});
        setMateriMap(materiData);
      } catch (error) {
        console.error("Error fetching materi:", error);
      }
    };

    getPenilaian();
    getMateri();
  }, [currentPage, searchTerm, userId]);
  const getDefaultAvatar = () => {
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="px-20">
      <Typography
        variant="h4"
        color="blue-gray"
        className="flex items-center font-medium font-title justify-center my-10"
      >
        Penilaian
      </Typography>
      <div className="flex justify-center items-center">
        <label className="input input-bordered flex items-center w-96 gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {penilaians.map((penilaian) => {
          return (
            <Card key={penilaian.id} className="mt-6 w-full pt-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-nowrap px-10">
                  <div className="flex items-center">
                    <img
                      src={
                        penilaian.img_materi
                          ? `${API_URL}/${penilaian.img_materi}`
                          : getDefaultAvatar()
                      }
                      className="flex items-center justify-between"
                      width={100}
                      alt="materi-image"
                    />
                  </div>
                  <div className="pt-6 ml-4">
                    <Typography
                      variant="h5"
                      color="black"
                      className="font-semibold font-title"
                    >
                      {materiMap[penilaian.tuga?.materi_id]?.name}
                    </Typography>
                    <Typography className="text-sm font-title">
                      {penilaian?.tuga?.nama_soal}
                    </Typography>
                  </div>
                </div>
                <div className="px-6">
                  <div className="flex justify-end items-center">
                    <Typography
                      variant="h2"
                      color="black"
                      className="flex justify-end font-medium font-title mr-4 border-2 p-4 rounded"
                    >
                      {penilaian.form_penilaian || "-"}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 bg-sky px-10 py-2 mt-2">
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0.25C12.2812 0.25 15.75 3.71875 15.75 8C15.75 12.2812 12.2812 15.75 8 15.75C3.71875 15.75 0.25 12.2812 0.25 8C0.25 3.71875 3.71875 0.25 8 0.25ZM8 14.25C11.4375 14.25 14.25 11.4688 14.25 8C14.25 4.5625 11.4375 1.75 8 1.75C4.53125 1.75 1.75 4.5625 1.75 8C1.75 11.4688 4.53125 14.25 8 14.25ZM9.90625 11L7.25 9.0625C7.15625 9 7.125 8.875 7.125 8.78125V3.625C7.125 3.4375 7.28125 3.25 7.5 3.25H8.5C8.6875 3.25 8.875 3.4375 8.875 3.625V8.0625L10.9375 9.59375C11.125 9.71875 11.1562 9.9375 11.0312 10.125L10.4375 10.9062C10.3125 11.0938 10.0938 11.125 9.90625 11Z"
                      fill="#333333"
                    />
                  </svg>

                  <Typography className="ml-2">
                    {penilaian.updatedat
                      ? new Date(penilaian.updatedat).toLocaleString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </Typography>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue text-sm text-white font-title font-medium px-10 py-1 rounded"
                    onClick={() => navigate(`/penilaian/${penilaian.id}`)}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default CardDefault;
