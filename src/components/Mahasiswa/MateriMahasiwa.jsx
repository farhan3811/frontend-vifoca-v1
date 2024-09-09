import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import DefaultPagination from "../Pagination/Pagination";

const getDefaultAvatar = () => {
  return "https://via.placeholder.com/150";
};

export function ProfileCard() {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize] = useState(8);

  useEffect(() => {
    getMateri();
  }, [searchTerm, currentPage]);

  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL;
  const getMateri = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/materi`, {
        params: {
          search: searchTerm,
          page: currentPage,
          pageSize,
        },
      });
      const { materi, totalPages } = response.data;

      setMateri(materi);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Gagal mengambil data materi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-20 mb-8">
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
      <div className="grid grid-cols-4 gap-8 mt-8 mb-8">
        {materi.map((materiItem) => (
          <div key={materiItem.id}>
            <Card className="w-72 h-72 py-8">
              <CardHeader
                floated={false}
                className="flex items-center justify-center h-60 shadow-none"
              >
                <img
                  src={
                    materiItem.img_materi
                      ? `${API_URL}/${materiItem.img_materi}`
                      : getDefaultAvatar()
                  }
                  alt={materiItem.name_materi}
                  className="flex items-center justify-center"
                  width={150}
                />
              </CardHeader>
              <CardBody className="text-left">
                <a href="/mahasiswa/tugas">
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-4 font-title font-medium"
                  >
                    {materiItem.name_materi}
                  </Typography>
                </a>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4.75V3.75C4 3.625 4.09375 3.5 4.25 3.5H10.75C10.875 3.5 11 3.625 11 3.75V4.75C11 4.90625 10.875 5 10.75 5H4.25C4.09375 5 4 4.90625 4 4.75ZM4.25 7.5C4.09375 7.5 4 7.40625 4 7.25V6.25C4 6.125 4.09375 6 4.25 6H10.75C10.875 6 11 6.125 11 6.25V7.25C11 7.40625 10.875 7.5 10.75 7.5H4.25ZM13.5938 12.5C13.4375 12.9062 13.4375 14.125 13.5938 14.5312C13.8125 14.5625 14 14.7812 14 15V15.5C14 15.7812 13.75 16 13.5 16H2.5C1.09375 16 0 14.9062 0 13.5V2.5C0 1.125 1.09375 0 2.5 0H13.5C13.75 0 14 0.25 14 0.5V12C14 12.25 13.8125 12.4688 13.5938 12.5ZM12.3125 12.5H2.5C1.9375 12.5 1.5 12.9688 1.5 13.5C1.5 14.0625 1.9375 14.5 2.5 14.5H12.3125C12.2188 13.9688 12.2188 13.0625 12.3125 12.5ZM12.5 1.5H2.5C1.9375 1.5 1.5 1.96875 1.5 2.5V11.2188C1.78125 11.0938 2.125 11 2.5 11H12.5V1.5Z"
                        fill="#333333"
                      />
                    </svg>
                    <Typography
                      color="blue-gray"
                      className="font-medium font-title text-base pl-2"
                    >
                      {materiItem.materiCount} Materi
                    </Typography>
                  </div>
                  <div className="flex">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.21875 0C9.0625 0 11.9062 2.25 11.9062 5.1875C11.9062 7.96875 9.78125 8.96875 8.90625 9.5C8.875 9.90625 8.6875 10.3125 8.40625 10.5938C8.9375 11.1875 9.25 11.9375 9.25 12.75C9.25 14.5625 7.78125 16 6 16C4.1875 16 2.75 14.5625 2.75 12.75C2.75 11.9375 3.03125 11.1875 3.59375 10.5938C3.3125 10.3125 3.125 9.90625 3.09375 9.5C2.21875 8.96875 0.09375 7.96875 0.09375 5.1875C0.09375 2.25 2.90625 0 6.21875 0ZM6.21875 2C4.46875 2 2.9375 3.5625 2.9375 5.1875C2.9375 7.125 5.3125 7.6875 5.3125 9.5H7.09375C7.09375 7.71875 9.5 7.125 9.5 5.1875C9.5 3.5625 7.9375 2 6.21875 2ZM6 11.75C5.28125 11.75 4.75 12.2812 4.75 13C4.75 13.75 5.28125 14.25 6 14.25C6.71875 14.25 7.25 13.75 7.25 13C7.25 12.2812 6.71875 11.75 6 11.75Z"
                        fill="#333333"
                      />
                    </svg>
                    <Typography
                      color="blue-gray"
                      className="font-medium font-title text-base pl-2"
                    >
                      {materiItem.lecturerCount} Lecturer
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
