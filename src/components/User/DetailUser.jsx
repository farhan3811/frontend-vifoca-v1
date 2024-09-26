import React, { useState, useEffect } from "react";
import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";

export function EditModal({ user, open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    prodi: "",
    email: "",
    role: "",
    id: ""
  });
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        nim: user.nim || "",
        prodi: user.prodi || "",
        email: user.email || "",
        role: user.role || "",
        id: user.uuid || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL; 
  const handleSubmit = async () => {
    const errors = {};

    if (!formData.name) errors.name = "Nama Lengkap tidak boleh kosong!";
    if (!formData.nim) errors.nim = "NIM tidak boleh kosong!";
    if (!formData.prodi) errors.prodi = "Program Studi tidak boleh kosong!";
    if (!formData.email) errors.email = "Email tidak boleh kosong!";
    if (!formData.role) errors.role = "Role tidak boleh kosong!";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (!formData.id) {
        console.error("ID tidak ditemukan");
        return;
      }

      const validData = {
        name: formData.name,
        nim: formData.nim,
        prodi: formData.prodi,
        email: formData.email,
        role: formData.role
      };

      console.log("Mengirim data:", validData);

      await axios.patch(
        `${API_URL}/${formData.id}`,
        validData
      );
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setFormErrors({ submit: "Gagal memperbarui data pengguna. Silakan coba lagi." });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} size="sm" className="p-10 rounded">
      <Typography
        variant="h4"
        color="blue-gray"
        className="flex font-title font-medium justify-center items-center"
      >
        Detail Siswa
      </Typography>
      <DialogBody className="mt-2 mb-2">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Typography color="gray" className="font-title font-medium text-sm">
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
              className="input input-bordered border-gray-300 disabled:border-gray-400 disabled:bg-white w-full bg-white h-10 max-w-xs"
              disabled
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs">{formErrors.name}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Typography color="gray" className="font-title font-medium text-sm">
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
              className="input input-bordered border-gray-300 disabled:border-gray-400 disabled:bg-white w-full bg-white h-10 max-w-xs"
              disabled
            />
            {formErrors.nim && (
              <p className="text-red-500 text-xs">{formErrors.nim}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Typography color="gray" className="font-title font-medium text-sm">
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
              className="input input-bordered border-gray-300 disabled:border-gray-400 disabled:bg-white w-full bg-white h-10 max-w-xs"
              disabled
            />
            {formErrors.prodi && (
              <p className="text-red-500 text-xs">{formErrors.prodi}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Typography color="gray" className="font-title font-medium text-sm">
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
              className="input input-bordered border-gray-300 disabled:border-gray-400 disabled:bg-white w-full bg-white h-10 max-w-xs"
              disabled
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs">{formErrors.email}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center">
            <Typography color="gray" className="font-title font-medium text-sm">
              Role
            </Typography>
          </div>
          <div className="col-span-2">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered border-gray-300 disabled:border-gray-400 disabled:bg-white w-full bg-white h-10 max-w-xs"
              disabled
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
            {formErrors.role && (
              <p className="text-red-500 text-xs"disabled>{formErrors.role}</p>
            )}
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div>
            <div>
              <Button
                fullWidth
                onClick={onClose}
                type="submit"
                className="flex items-center rounded justify-center w-40 gap-2 mt-6 normal-case font-title font-medium bg-blue"
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
      </DialogBody>
    </Dialog>
  );
}

export default EditModal;
