import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  Card,
  Typography,
} from "@material-tailwind/react";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export function EditModal({ materi, open, onClose }) {
  const [formData, setFormData] = useState({
    name_materi: "",
    img_materi: null,
    ket_materi: "",
    vid_materi: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (materi) {
      setFormData({
        name_materi: materi.name_materi || "",
        img_materi: null,
        ket_materi: materi.ket_materi || "",
        vid_materi: materi.vid_materi || "",
      });
      setFileName(materi.img_materi ? materi.img_materi.split('/').pop() : "");
    }
  }, [materi]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img_materi") {
      if (files[0]) {
        setFormData((prevData) => ({
          ...prevData,
          img_materi: files[0],
        }));
        setFileName(files[0].name);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name_materi || !formData.ket_materi || !formData.vid_materi) {
      setErrorMessage("Semua kolom harus diisi!");
      return;
    }

    try {
      const data = new FormData();
      data.append("name_materi", formData.name_materi);
      if (formData.img_materi) {
        data.append("img_materi", formData.img_materi);
      }
      data.append("ket_materi", formData.ket_materi);
      data.append("vid_materi", formData.vid_materi);
     
      await axios.patch(
        `${API_URL}/api/materi/${materi.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Data berhasil diperbarui!");
      onClose();
    } catch (error) {
      setErrorMessage("Gagal memperbarui data. Silakan coba lagi.");
    }
  };

  return (
    <Dialog className="p-4 rounded" size="sm" open={open} handler={onClose}>
      <DialogBody className="flex justify-center items-center">
        <Card color="transparent" shadow={false}>
          <Typography
            variant="h4"
            color="blue-gray"
            className="flex font-title font-medium justify-center items-center"
          >
            Edit Materi
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
              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <Typography
                    color="gray"
                    className="font-title font-medium text-sm"
                  >
                    Foto
                  </Typography>
                </div>
                <div className="col-span-2 relative">
                  <input
                    type="file"
                    name="img_materi"
                    id="file-input"
                    accept="image/*"
                    className="absolute opacity-0 w-0 h-0 font-title"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="file-input"
                    className="input input-bordered flex w-60 items-center gap-2 cursor-pointer relative"
                  >
                    <span className="text-gray-400 flex-grow font-title font-medium text-sm">
                      {truncateText(fileName, 20)} 
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
              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <Typography
                    color="gray"
                    className="font-title font-medium text-sm"
                  >
                    Nama Materi
                  </Typography>
                </div>
                <input
                  type="text"
                  placeholder="Nama Materi"
                  name="name_materi"
                  value={formData.name_materi}
                  className="input input-bordered w-60 col-span-2"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <Typography
                    color="gray"
                    className="font-title font-medium text-sm"
                  >
                    Keterangan
                  </Typography>
                </div>
                <textarea
                  name="ket_materi"
                  placeholder="Keterangan"
                  value={formData.ket_materi}
                  className="input input-bordered w-60 col-span-2"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-3">
                <div className="flex items-center">
                  <Typography
                    color="gray"
                    className="font-title font-medium text-sm"
                  >
                    Link Video
                  </Typography>
                </div>
                <input
                  type="text"
                  placeholder="Link Video"
                  name="vid_materi"
                  value={formData.vid_materi}
                  className="input input-bordered w-60 col-span-2"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Button
                  fullWidth
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal rounded"
                >
                  Batal
                </Button>
              </div>
              <div>
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  type="submit"
                  className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue rounded"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </DialogBody>
    </Dialog>
  );
}

export default EditModal;
