import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import DeleteModal from "./User/DeleteUser";
import DefaultPagination from "./Pagination/Pagination";
import Breadcumbs from "./User/Breadcumbs";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const TABLE_HEAD = ["No", "Profile", "Nama", "NIM", "Email", "Aksi"];
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;
  const getPendingUsers = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/users/pending`, {
        params: {
          page,
          search,
          sortOrder,
        },
      });
      console.log("Response data:", response.data);
      setUsers(response.data.pendingUsers);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getPendingUsers(currentPage, search, sortOrder);
  }, [currentPage, search, sortOrder]);

  const getDefaultAvatar = () => "https://via.placeholder.com/150";
  const approveUser = async (userId) => {
    try {
      await axios.put(`${API_URL}/users/approve/${userId}`);
      console.log(`User with ID ${userId} approved successfully.`);
      getPendingUsers(currentPage);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container px-20 mt-10">
      <Breadcumbs />
      <Card className="w-full h-full p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="flex flex-wrap gap-2">
            <div className="w-50">
              <Select
                className="border-gray-300 rounded"
                label="Sort By"
                value={sortOrder}
                onChange={(value) => setSortOrder(value)}
              >
                <Option value="desc">Terbaru</Option>
                <Option value="asc">Terlama</Option>
              </Select>
            </div>
            <div className="w-full md:w-72">
              <label className="input input-bordered border-gray-300 bg-white h-10 flex items-center gap-2">
                <input
                  type="text"
                  className="grow bg-white"
                  placeholder="Cari"
                  value={search}
                  onChange={handleSearchChange}
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
          <div className="flex justify-end gap-2">
            <Link to="/users">
              <Button className="flex flex-wrap font-tile font-medium text-xs gap-1 normal-case bg-konfirmasi rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 12"
                  className="h-4 w-4"
                >
                  <path
                    d="M9.13965 2.5C8.7959 2.53125 8.45215 2.5625 8.13965 2.65625C8.2959 2.90625 8.3584 3.21875 8.38965 3.5C8.38965 4.46875 7.57715 5.25 6.63965 5.25C6.32715 5.25 6.01465 5.1875 5.7959 5.03125C5.70215 5.34375 5.63965 5.65625 5.63965 6C5.63965 7.9375 7.20215 9.5 9.13965 9.5C11.0771 9.5 12.6396 7.9375 12.6396 6C12.6396 4.09375 11.0771 2.53125 9.13965 2.53125V2.5ZM18.0146 5.5625C16.3271 2.25 12.9521 0 9.13965 0C5.2959 0 1.9209 2.25 0.233398 5.5625C0.170898 5.6875 0.139648 5.84375 0.139648 6C0.139648 6.1875 0.170898 6.34375 0.233398 6.46875C1.9209 9.78125 5.2959 12 9.13965 12C12.9521 12 16.3271 9.78125 18.0146 6.46875C18.0771 6.34375 18.1084 6.1875 18.1084 6.03125C18.1084 5.84375 18.0771 5.6875 18.0146 5.5625ZM9.13965 10.5C6.0459 10.5 3.20215 8.78125 1.70215 6C3.20215 3.21875 6.0459 1.5 9.13965 1.5C12.2021 1.5 15.0459 3.21875 16.5459 6C15.0459 8.78125 12.2021 10.5 9.13965 10.5Z"
                    fill="white"
                  />
                </svg>
                List User
              </Button>
            </Link>
          </div>
        </div>

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
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.uuid || index}
                  className={index % 2 === 0 ? "bg-odd" : "bg-white"}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={user.avatar || getDefaultAvatar()}
                      alt={`Profile of ${user.name}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.nim}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 flex flex-wrap gap-2">
                    <Typography
                      color="red"
                      onClick={() => handleDeleteClick(user)}
                      tooltip="Hapus"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="bg-trash p-1 rounded cursor-pointer "
                      >
                        <path
                          d="M8.51465 13H9.26465C9.45215 13 9.63965 12.8438 9.63965 12.625V5.875C9.63965 5.6875 9.45215 5.5 9.26465 5.5H8.51465C8.2959 5.5 8.13965 5.6875 8.13965 5.875V12.625C8.13965 12.8438 8.2959 13 8.51465 13ZM13.6396 2.5H11.0459L9.9834 0.75C9.7334 0.3125 9.2334 0 8.70215 0H5.5459C5.01465 0 4.51465 0.3125 4.26465 0.75L3.20215 2.5H0.608398C0.358398 2.5 0.170898 2.6875 0.170898 2.875V3.625C0.170898 3.8125 0.358398 4 0.608398 4H1.1709V14.625C1.1709 15.4375 1.8114 16 2.6084 16H11.6084C12.4059 16 13.0459 15.4375 13.0459 14.625V4H13.6084C13.8584 4 14.0459 3.8125 14.0459 3.625V2.875C14.0459 2.6875 13.8584 2.5 13.6396 2.5ZM5.9209 1.5C6.1084 1.5 6.2959 1.3125 6.2959 1.125V0.375C6.2959 0.1875 6.1084 0 5.9209 0H4.0799C3.8924 0 3.7049 0.1875 3.7049 0.375V1.125C3.7049 1.3125 3.8924 1.5 4.0799 1.5H5.9209ZM11.6084 14.625H2.6084V4H11.6084V14.625Z"
                          fill="white"
                        />
                      </svg>
                    </Typography>
                    <Typography
                      color="blue"
                      onClick={() => approveUser(user.uuid)}
                      tooltip="Edit"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 19 17"
                        xmlns="http://www.w3.org/2000/svg"
                        className="bg-edit p-1 rounded cursor-pointer"
                      >
                        <path
                          d="M20.0459 5.0625C20.1709 5.1875 20.1709 5.375 20.0459 5.5L15.9834 9.59375C15.8584 9.71875 15.6396 9.71875 15.5146 9.59375L13.2334 7.25C13.1084 7.125 13.1084 6.9375 13.2334 6.8125L13.8271 6.1875C13.9521 6.0625 14.1396 6.0625 14.2646 6.1875L15.7646 7.6875L18.9834 4.4375C19.1084 4.3125 19.2959 4.3125 19.4209 4.4375L20.0459 5.0625ZM7.13965 9C4.63965 9 2.63965 7 2.63965 4.5C2.63965 2.03125 4.63965 0 7.13965 0C9.6084 0 11.6396 2.03125 11.6396 4.5C11.6396 7 9.6084 9 7.13965 9ZM7.13965 1.5C5.4834 1.5 4.13965 2.875 4.13965 4.5C4.13965 6.15625 5.4834 7.5 7.13965 7.5C8.76465 7.5 10.1396 6.15625 10.1396 4.5C10.1396 2.875 8.76465 1.5 7.13965 1.5ZM9.9209 9.5C12.2334 9.5 14.1396 11.4062 14.1396 13.7188V14.5C14.1396 15.3438 13.4521 16 12.6396 16H1.63965C0.795898 16 0.139648 15.3438 0.139648 14.5V13.7188C0.139648 11.4062 2.01465 9.5 4.32715 9.5C5.2334 9.5 5.63965 10 7.13965 10C8.6084 10 9.01465 9.5 9.9209 9.5ZM12.6396 14.5V13.7188C12.6396 12.2188 11.4209 11 9.9209 11C9.45215 11 8.7334 11.5 7.13965 11.5C5.51465 11.5 4.7959 11 4.32715 11C2.82715 11 1.63965 12.2188 1.63965 13.7188V14.5H12.6396Z"
                          fill="white"
                        />
                      </svg>
                    </Typography>
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

        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
      <DeleteModal
        user={selectedUser}
        open={deleteModalOpen}
        onClose={handleCloseModal}
        getUsers={getPendingUsers}
      />
    </div>
  );
};

export default Userlist;
