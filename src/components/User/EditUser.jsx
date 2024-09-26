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
        id: user.uuid || "" // Pastikan id disesuaikan dengan field uuid di controller
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

    // Validasi input
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
      // Periksa ID
      if (!formData.id) {
        console.error("ID tidak ditemukan");
        return;
      }

      // Pastikan data valid
      const validData = {
        name: formData.name,
        nim: formData.nim,
        prodi: formData.prodi,
        email: formData.email,
        role: formData.role
      };
      console.log("Mengirim data:", validData);

      const response = await axios.patch(
        `${API_URL}/users/${formData.id}`,
        validData
      );
  
      console.log("Response:", response.data); 
      onClose();
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
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
        Edit Siswa
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
              className="input input-bordered w-full bg-white h-10 max-w-xs"
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
              className="input input-bordered w-full bg-white h-10 max-w-xs"
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
              className="input input-bordered w-full bg-white h-10 max-w-xs"
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
              className="input input-bordered w-full bg-white h-10 max-w-xs"
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
              className="select select-bordered w-full bg-white h-10 max-w-xs"
            >
              <option value="" disabled>
                Pilih Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
            {formErrors.role && (
              <p className="text-red-500 text-xs">{formErrors.role}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              fullWidth
              onClick={onClose}
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal"
            >
              Batal
            </Button>
          </div>
          <div>
            <Button
              fullWidth
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue"
            >
              Simpan
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default EditModal;
