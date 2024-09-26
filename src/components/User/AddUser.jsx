import React, { useState } from "react";
import axios from "axios";
import moment from 'moment-timezone';
import {
  Button,
  Dialog,
  DialogBody,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Modal1({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    prodi: "",
    email: "",
    role: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", nim: "", prodi: "", email: "", role: "" });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.nim || !formData.prodi || !formData.email) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    const timestamp = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    try {
      const hashedPassword = await (formData.nim);

      const userData = {
        ...formData,
        password: hashedPassword,
        isApproved: true,
        created_at: timestamp,
        updated_at: timestamp,
      };

      await axios.post(`${API_URL}/users`, userData);
      setSuccessMessage("Data berhasil ditambahkan!");
      navigate("/users");
      onAdd(); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setErrorMessage("Gagal menambahkan data!");
      }
    }
  };

  return (
    <section className="grid place-items-center rounded">
      <Button
        onClick={handleOpen}
        className="flex flex-wrap font-tile font-medium text-xs gap-1 normal-case bg-edit rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
          className="h-4 w-4"
        >
          <path
            d="M11 6.5C11 6.3125 10.8125 6.125 10.625 6.125H7.875V3.375C7.875 3.1875 7.6875 3 7.5 3H6.5C6.28125 3 6.125 3.1875 6.125 3.375V6.125H3.375C3.15625 6.125 3 6.3125 3 6.5V7.5C3 7.71875 3.15625 7.875 3.375 7.875H6.125V10.625C6.125 10.8438 6.28125 11 6.5 11H7.5C7.6875 11 7.875 10.8438 7.875 10.625V7.875H10.625C10.8125 7.875 11 7.71875 11 7.5V6.5ZM14 1.5C14 0.6875 13.3125 0 12.5 0H1.5C0.65625 0 0 0.6875 0 1.5V12.5C0 13.3438 0.65625 14 1.5 14H12.5C13.3125 14 14 13.3438 14 12.5V1.5ZM12.5 12.3125C12.5 12.4375 12.4062 12.5 12.3125 12.5H1.6875C1.5625 12.5 1.5 12.4375 1.5 12.3125V1.6875C1.5 1.59375 1.5625 1.5 1.6875 1.5H12.3125C12.4062 1.5 12.5 1.59375 12.5 1.6875V12.3125Z"
            fill="white"
          />
        </svg>
        Tambah Siswa
      </Button>
      <Dialog className="p-4 rounded-2xl" size="sm" open={open} handler={handleClose}>
        <DialogBody className="flex justify-center items-center">
          <Card color="transparent" shadow={false}>
            <Typography
              variant="h4"
              color="blue-gray"
              className="flex font-title font-medium justify-center items-center"
            >
              Siswa
            </Typography>
            {successMessage && (
              <Typography
                variant="body"
                color="green"
                className="flex font-medium justify-center items-center mt-4"
              >
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography
                variant="body"
                color="red"
                className="flex font-medium justify-center items-center mt-4"
              >
                {errorMessage}
              </Typography>
            )}
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 gap-4 flex flex-wrap">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Nama Lengkap
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="input input-bordered bg-white w-full h-10 max-w-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      NIM
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      name="nim"
                      type="number"
                      value={formData.nim}
                      onChange={handleChange}
                      placeholder="NIM"
                      className="input input-bordered w-full bg-white h-10 max-w-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Program Studi
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      name="prodi"
                      type="text"
                      value={formData.prodi}
                      onChange={handleChange}
                      placeholder="Program Studi"
                      className="input input-bordered w-full bg-white h-10 max-w-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Email
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="input input-bordered w-full bg-white h-10 max-w-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Role
                    </Typography>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="input input-bordered flex bg-white justify-end w-58 h-10 max-w-xs"
                    >
                      <option value="" disabled>Pilih Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">Dosen</option>
                      <option value="mahasiswa">Mahasiswa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <Button
                    fullWidth
                    type=""
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17 17"
                      className="h-4 w-4"
                    >
                      <path
                        d="M8.5 0.75C4.21875 0.75 0.75 4.25 0.75 8.5C0.75 12.7812 4.21875 16.25 8.5 16.25C12.75 16.25 16.25 12.7812 16.25 8.5C16.25 4.25 12.75 0.75 8.5 0.75ZM8.5 14.75C5.03125 14.75 2.25 11.9688 2.25 8.5C2.25 5.0625 5.03125 2.25 8.5 2.25C11.9375 2.25 14.75 5.0625 14.75 8.5C14.75 11.9688 11.9375 14.75 8.5 14.75ZM9.8125 11.5C9.8125 10.7812 9.21875 10.1875 8.5 10.1875C7.75 10.1875 7.1875 10.7812 7.1875 11.5C7.1875 12.25 7.75 12.8125 8.5 12.8125C9.21875 12.8125 9.8125 12.25 9.8125 11.5ZM7.25 4.90625L7.46875 9.15625C7.46875 9.34375 7.65625 9.5 7.84375 9.5H9.125C9.3125 9.5 9.5 9.34375 9.5 9.15625L9.71875 4.90625C9.71875 4.6875 9.5625 4.5 9.34375 4.5H7.625C7.40625 4.5 7.25 4.6875 7.25 4.90625Z"
                        fill="white"
                      />
                    </svg>
                    Batal
                  </Button>
                </div>
                <div>
                  <div>
                    <Button
                      fullWidth
                      type="submit"
                      className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 15"
                        className="h-4 w-4"
                      >
                        <path
                          d="M13.5312 3.5625C13.8125 3.84375 14 4.21875 14 4.625V13C14 13.8438 13.3125 14.5 12.5 14.5H1.5C0.65625 14.5 0 13.8438 0 13V2C0 1.1875 0.65625 0.5 1.5 0.5H9.875C10.2812 0.5 10.6562 0.6875 10.9375 0.96875L13.5312 3.5625ZM8.5 2H4.5V4.5H8.5V2ZM12.3125 13C12.4062 13 12.5 12.9375 12.5 12.8125V4.71875C12.5 4.65625 12.4688 4.625 12.4375 4.59375L10 2.125V5.25C10 5.6875 9.65625 6 9.25 6H3.75C3.3125 6 3 5.6875 3 5.25V2H1.6875C1.5625 2 1.5 2.09375 1.5 2.1875V12.8125C1.5 12.9375 1.5625 13 1.6875 13H12.3125ZM7 6.75C8.5 6.75 9.75 8 9.75 9.5C9.75 11.0312 8.5 12.25 7 12.25C5.46875 12.25 4.25 11.0312 4.25 9.5C4.25 8 5.46875 6.75 7 6.75ZM7 10.75C7.6875 10.75 8.25 10.2188 8.25 9.5C8.25 8.8125 7.6875 8.25 7 8.25C6.28125 8.25 5.75 8.8125 5.75 9.5C5.75 10.2188 6.28125 10.75 7 10.75Z"
                          fill="white"
                        />
                      </svg>
                      Simpan
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </DialogBody>
      </Dialog>
    </section>
  );
}


export default Modal1;
