import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Card,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import AddTugas from "./AddTugas";

const TABLE_HEAD = [
  "No",
  "Foto Tugas",
  "Nama Soal",
  "Materi",
  "Tingkat Kesulitan",
  "Soal",
  "Deadline",
  "Aksi"
];

const List = () => {
  const [tugas, setTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [materi, setMateri] = useState([]);

  useEffect(() => {
    const getTugas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tugas", {
          params: {
            search,
            sortOrder,
            page,
          },
        });
        setTugas(response.data.tugas);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch tugas:", error);
      } finally {
        setLoading(false);
      }
    };

    const getMateri = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Materi");
        const { materi} = response.data;
  
        setMateri(materi);
      } catch (error) {
        console.error("Gagal mengambil data materi:", error);
      }
    };

    getTugas();
    getMateri();
  }, [search, sortOrder, page]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="container px-20 mt-10">
        <Card className="w-full h-full p-6">
          <Card className="h-full w-full overflow-scroll">
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex flex-wrap gap-2">
                <div className="w-50">
                  <Select
                    label="Sort By"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <Option value="desc">Terbaru</Option>
                    <Option value="asc">Terlama</Option>
                  </Select>
                </div>
                <div className="w-full md:w-72">
                  <label className="input input-bordered h-10 flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
              </div>
              <div className="flex justify-end">
                <AddTugas />
              </div>
            </div>
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-blue p-4"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none font-title"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tugas.length > 0 ? (
                  tugas.map((item, index) => (
                    <tr key={item.uuid}>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <img
                          src={item.foto_tugas || ""}
                          className="w-10 h-10 rounded-full"
                          alt="Tugas Icon" // Add alt text for accessibility
                        />
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.nama_soal}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate"
                        >
                          {
                            materi.find(
                              (materi) => materi.id === item.materi_id
                            )?.name_materi || "Unknown"
                          }
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate"
                        >
                          {item.status_level}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate"
                        >
                          {item.ket_assigment}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {format(
                            new Date(item.deadline),
                            "dd MMM yyyy, HH:mm"
                          )}
                        </Typography>
                      </td>
                      <td className="p-4 flex flex-wrap gap-2">
                  <Typography
                    color="red"
                    // onClick={() => handleDeleteClick(user)}
                    tooltip="Hapus"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-trash p-1 rounded-sm cursor-pointer "
                    >
                      <path
                        d="M8.51465 13H9.26465C9.45215 13 9.63965 12.8438 9.63965 12.625V5.875C9.63965 5.6875 9.45215 5.5 9.26465 5.5H8.51465C8.2959 5.5 8.13965 5.6875 8.13965 5.875V12.625C8.13965 12.8438 8.2959 13 8.51465 13ZM13.6396 2.5H11.0459L9.9834 0.75C9.7334 0.3125 9.2334 0 8.70215 0H5.5459C5.01465 0 4.51465 0.3125 4.26465 0.75L3.20215 2.5H0.608398C0.358398 2.5 0.170898 2.6875 0.170898 2.875V3.625C0.170898 3.8125 0.358398 4 0.608398 4H1.1709V14.625C1.1709 15.4375 1.8114 16 2.6084 16H11.6084C12.4059 16 13.0459 15.4375 13.0459 14.625V4H13.6084C13.8584 4 14.0459 3.8125 14.0459 3.625V2.875C14.0459 2.6875 13.8584 2.5 13.6396 2.5ZM5.9209 1.5C6.1084 1.5 6.2959 1.3125 6.2959 1.125V0.375C6.2959 0.1875 6.1084 0 5.9209 0H4.0799C3.8924 0 3.7049 0.1875 3.7049 0.375V1.125C3.7049 1.3125 3.8924 1.5 4.0799 1.5H5.9209ZM11.6084 14.625H2.6084V4H11.6084V14.625Z"
                        fill="white"
                      />
                    </svg>
                  </Typography>
                  <Typography
                    color="blue"
                    // onClick={() => handleDetail(user)}
                    tooltip="Edit"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 19 12"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-blue p-1 rounded-sm cursor-pointer"
                    >
                      <path
                        d="M9.13965 2.5C8.7959 2.53125 8.45215 2.5625 8.13965 2.65625C8.2959 2.90625 8.3584 3.21875 8.38965 3.5C8.38965 4.46875 7.57715 5.25 6.63965 5.25C6.32715 5.25 6.01465 5.1875 5.7959 5.03125C5.70215 5.34375 5.63965 5.65625 5.63965 6C5.63965 7.9375 7.20215 9.5 9.13965 9.5C11.0771 9.5 12.6396 7.9375 12.6396 6C12.6396 4.09375 11.0771 2.53125 9.13965 2.53125V2.5ZM18.0146 5.5625C16.3271 2.25 12.9521 0 9.13965 0C5.2959 0 1.9209 2.25 0.233398 5.5625C0.170898 5.6875 0.139648 5.84375 0.139648 6C0.139648 6.1875 0.170898 6.34375 0.233398 6.46875C1.9209 9.78125 5.2959 12 9.13965 12C12.9521 12 16.3271 9.78125 18.0146 6.46875C18.0771 6.34375 18.1084 6.1875 18.1084 6.03125C18.1084 5.84375 18.0771 5.6875 18.0146 5.5625ZM9.13965 10.5C6.0459 10.5 3.20215 8.78125 1.70215 6C3.20215 3.21875 6.0459 1.5 9.13965 1.5C12.2021 1.5 15.0459 3.21875 16.5459 6C15.0459 8.78125 12.2021 10.5 9.13965 10.5Z"
                        fill="white"
                      />
                    </svg>
                  </Typography>
                  <Typography
                    color="blue"
                    // onClick={() => handleEdit(user)}
                    tooltip="Edit"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 19 17"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-edit p-1 rounded-sm cursor-pointer"
                    >
                      <path
                        d="M12.7021 11.7812L13.7021 10.7812C13.8584 10.625 14.1396 10.75 14.1396 10.9688V15.5C14.1396 16.3438 13.4521 17 12.6396 17H1.63965C0.795898 17 0.139648 16.3438 0.139648 15.5V4.5C0.139648 3.6875 0.795898 3 1.63965 3H10.1709C10.3896 3 10.5146 3.28125 10.3584 3.4375L9.3584 4.4375C9.2959 4.5 9.2334 4.5 9.1709 4.5H1.63965V15.5H12.6396V11.9688C12.6396 11.9062 12.6396 11.8438 12.7021 11.7812ZM17.5771 5.5L9.38965 13.6875L6.5459 14C5.7334 14.0938 5.0459 13.4062 5.13965 12.5938L5.45215 9.75L13.6396 1.5625C14.3584 0.84375 15.5146 0.84375 16.2334 1.5625L17.5771 2.90625C18.2959 3.625 18.2959 4.78125 17.5771 5.5ZM14.5146 6.4375L12.7021 4.625L6.88965 10.4375L6.63965 12.5L8.70215 12.25L14.5146 6.4375ZM16.5146 3.96875L15.1709 2.625C15.0459 2.46875 14.8271 2.46875 14.7021 2.625L13.7646 3.5625L15.5771 5.40625L16.5459 4.4375C16.6709 4.28125 16.6709 4.09375 16.5146 3.96875Z"
                        fill="white"
                      />
                    </svg>
                  </Typography>
                </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        Tidak ada tugas ditemukan
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default List;
