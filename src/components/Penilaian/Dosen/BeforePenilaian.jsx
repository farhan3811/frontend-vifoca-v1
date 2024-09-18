import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import DetailModal from "../../User/DetailUser";
import { Link } from "react-router-dom";

const PenilaianList = () => {
  const [penilaian, setPenilaian] = useState([]);
  const [materiMap, setMateriMap] = useState({});
  const [selectedPenilaian, setSelectedPenilaian] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [search, setSearch] = useState("");

  const TABLE_HEAD = [
    "No",
    "Nama Mahasiswa",
    "Materi",
    "Latihan",
    "Tanggal",
    "Aksi",
  ];

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  const getPenilaian = async () => {
    try {
      const response = await axios.get(`${API_URL}/penilaian`, {
        params: { search },
      });
      const filteredPenilaian = response.data.penilaian.filter(
        (item) => !item.form_penilaian || item.form_penilaian.trim() === ""
      );
      setPenilaian(filteredPenilaian || []);
    } catch (error) {
      console.error("Error fetching penilaian:", error);
    }
  };

  const getMateri = async () => {
    try {
      const response = await axios.get(`${API_URL}/materi`);
      const materiData = response.data.materi.reduce((map, materi) => {
        map[materi.id] = materi.name_materi;
        return map;
      }, {});
      setMateriMap(materiData);
    } catch (error) {
      console.error("Error fetching materi:", error);
    }
  };

  useEffect(() => {
    getPenilaian();
    getMateri();
  }, [search]);

  const handleDetail = (penilaian) => {
    setSelectedPenilaian(penilaian);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedPenilaian(null);
    getPenilaian();
  };

  return (
    <Card className="w-full h-full mb-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
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
          {penilaian.length > 0 ? (
            penilaian.map((item, index) => (
              <tr
                key={item.id || index}
                className={index % 2 === 0 ? "bg-odd" : "bg-white"}
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.user?.name || "N/A"}</td>
                <td className="p-4">
                  {materiMap[item.tuga?.materi_id] || "N/A"}
                </td>
                <td className="p-4">{item.tuga?.nama_soal || "N/A"}</td>
                <td className="p-4">
                  {item.createdat
                    ? new Date(item.createdat).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-4 flex flex-wrap gap-2">
                  <Link to={`/penilaian/${item.id}`}>
                    <Typography color="blue" tooltip="Edit">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 19 17"
                        xmlns="http://www.w3.org/2000/svg"
                        className="bg-edit p-1 rounded cursor-pointer"
                      >
                        <path
                          d="M12.7021 11.7812L13.7021 10.7812C13.8584 10.625 14.1396 10.75 14.1396 10.9688V15.5C14.1396 16.3438 13.4521 17 12.6396 17H1.63965C0.795898 17 0.139648 16.3438 0.139648 15.5V4.5C0.139648 3.6875 0.795898 3 1.63965 3H10.1709C10.3896 3 10.5146 3.28125 10.3584 3.4375L9.3584 4.4375C9.2959 4.5 9.2334 4.5 9.1709 4.5H1.63965V15.5H12.6396V11.9688C12.6396 11.9062 12.6396 11.8438 12.7021 11.7812ZM17.5771 5.5L9.38965 13.6875L6.5459 14C5.7334 14.0938 5.0459 13.4062 5.13965 12.5938L5.45215 9.75L13.6396 1.5625C14.3584 0.84375 15.5146 0.84375 16.2334 1.5625L17.5771 2.90625C18.2959 3.625 18.2959 4.78125 17.5771 5.5ZM14.5146 6.4375L12.7021 4.625L6.88965 10.4375L6.63965 12.5L8.70215 12.25L14.5146 6.4375ZM16.5146 3.96875L15.1709 2.625C15.0459 2.46875 14.8271 2.46875 14.7021 2.625L13.7646 3.5625L15.5771 5.40625L16.5459 4.4375C16.6709 4.28125 16.6709 4.09375 16.5146 3.96875Z"
                          fill="white"
                        />
                      </svg>
                    </Typography>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                Data Tidak Ada
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <DetailModal
        penilaian={selectedPenilaian}
        open={openDetailModal}
        onClose={handleCloseDetailModal}
      />
    </Card>
  );
};

export default PenilaianList;
