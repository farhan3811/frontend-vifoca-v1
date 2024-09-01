import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Dialog,
  DialogBody,
  Card,
  Typography,
} from "@material-tailwind/react";

export function Modal1() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    materi_id: "",
    nama_soal: "",
    status_level: "",
    foto_tugas: null,
    ket_assigment: "",
    deadline: new Date(),
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [materi, setMateri] = useState([]);
useEffect(() => {
  getMateri();
}, []);

  const getMateri = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Materi");
      const { materi} = response.data;

      setMateri(materi);
    } catch (error) {
      console.error("Gagal mengambil data materi:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setFormData((prevData) => ({
      ...prevData,
      foto_tugas: file,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      materi_id: "",
      nama_soal: "",
      status_level: "",
      foto_tugas: null,
      ket_assigment: "",
      deadline: new Date(),
    });
    setFileName("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto_tugas") {
      setFormData((prevData) => ({
        ...prevData,
        foto_tugas: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      deadline: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama_soal || !formData.ket_assigment || !formData.status_level) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      const data = new FormData();
      data.append("materi_id", formData.materi_id); // Tidak ada penanganan khusus di sini
      data.append("nama_soal", formData.nama_soal);
      data.append("status_level", formData.status_level);
      data.append("foto_tugas", formData.foto_tugas);
      data.append("ket_assigment", formData.ket_assigment);
      data.append("deadline", formData.deadline.toISOString());

      const response = await axios.post(
        "http://localhost:5000/tugas",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Data added successfully:", response.data);
      setSuccessMessage("Data berhasil ditambahkan!");
      handleClose(); 
      window.location.reload();
    } catch (error) {
      console.error(
        "Error adding data:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <section className="grid place-items-center">
      <Button
        onClick={handleOpen}
        className="flex flex-wrap font-title font-medium text-xs gap-1 normal-case bg-edit"
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
        Tambah Tugas
      </Button>
      <Dialog className="p-4" size="sm" open={open} handler={handleClose}>
        <DialogBody className="flex justify-center items-center overflow-y-auto max-h-[96vh] p-4">
          <Card color="transparent" shadow={false}>
            <Typography
              variant="h4"
              color="blue-gray"
              className="flex font-title font-medium justify-center items-center"
            >
              Latihan
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
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Tingkat Soal
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    {" "}
                    <select
                      className="select select-bordered w-60 max-w-xs"
                      name="status_level"
                      value={formData.status_level}
                      onChange={handleChange}
                      placeholder="Tingkat Soal"
                    >
                      <option value="" disabled hidden>
                        Tingkat Soal
                      </option>
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Sulit">Sulit</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Nama Soal
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    {" "}
                    <input
                      name="nama_soal"
                      value={formData.nama_soal}
                      onChange={handleChange}
                      placeholder="Nama Soal"
                      type="text"
                      className="input input-bordered w-60 max-w-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Materi
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    {" "}
                    <select
                      className="select select-bordered w-60 max-w-xs"
                      name="materi_id"
                      value={formData.materi_id}
                      onChange={handleChange}
                      placeholder="Materi"
                    >
                      <option value="">Pilih Materi</option>
                      {materi.map((materi) => (
                        <option key={materi.id} value={materi.id}>
                          {materi.name_materi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center">
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Foto Tugas
                    </Typography>
                  </div>
                  <div className="col-span-2 relative">
                    <input
                      type="file"
                      id="file-input"
                      accept="image/*"
                      className="absolute opacity-0 w-0 h-0"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-input"
                      className="input input-bordered flex w-60 items-center gap-2 cursor-pointer relative"
                    >
                      <span className="text-gray-500 flex-grow">
                        {fileName || "Foto"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 14"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70 absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <path
                          d="M12.3438 7.375C12.5938 7.625 12.4062 8 12.0938 8H10V10.625C10 10.8438 9.8125 11 9.625 11H8.375C8.15625 11 8 10.8438 8 10.625V8H5.90625C5.5625 8 5.375 7.625 5.625 7.375L8.71875 4.28125C8.875 4.125 9.09375 4.125 9.25 4.28125L12.3438 7.375ZM16.9688 5.28125C18.75 5.90625 20 7.59375 20 9.5C20 12 17.9688 14 15.5 14H5C2.21875 14 0 11.7812 0 9C0 6.96875 1.21875 5.15625 3.09375 4.375C3.625 1.875 5.84375 0 8.5 0C10.25 0 11.7812 0.84375 12.7812 2.09375C13 2.03125 13.25 2 13.5 2C15.3438 2 16.8438 3.46875 16.9688 5.28125ZM15.5 12.5C17.1562 12.5 18.5 11.1562 18.5 9.5C18.5 7.84375 17.1562 6.5 15.5 6.5C15.4062 6.5 15.3125 6.53125 15.2188 6.53125C15.375 6.21875 15.5 5.875 15.5 5.5C15.5 4.40625 14.5938 3.5 13.5 3.5C13 3.5 12.5312 3.6875 12.1875 4C11.5938 2.53125 10.1562 1.5 8.5 1.5C6.28125 1.5 4.5 3.3125 4.5 5.5V5.5625C2.78125 5.78125 1.5 7.25 1.5 9C1.5 10.9375 3.0625 12.5 5 12.5H15.5Z"
                          fill="#666666"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Deadline
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    {" "}
                    <DatePicker
                      selected={formData.deadline}
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="Pp"
                      className="border rounded p-2 w-60"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    {" "}
                    <Typography
                      color="gray"
                      className="font-title font-medium text-sm"
                    >
                      Soal
                    </Typography>
                  </div>
                  <div className="col-span-2">
                    {" "}
                    <textarea
                      className="textarea textarea-bordered  w-60"
                      name="ket_assigment"
                      value={formData.ket_assigment}
                      onChange={handleChange}
                      placeholder="Keterangan"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Button
                    fullWidth
                    type=""
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal"
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
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    type="submit"
                    className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue"
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
            </form>
          </Card>
        </DialogBody>
      </Dialog>
    </section>
  );
}

export default Modal1;
