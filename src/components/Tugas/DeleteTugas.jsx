import React, { useState } from "react";
import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";

export default function DeleteModal({ tugas, open, onClose, getTugas }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL; 
  const handleDelete = async (tugasid) => {
    try {
      console.log('Menghapus materi dengan UUID:', tugasid); // Tambahkan log untuk debugging
      await axios.delete(`${API_URL}/${tugasid}`);
      getTugas();
      setSuccessMessage("Data berhasil dihapus!"); // Refresh data setelah penghapusan
      onClose();
    } catch (error) {
      console.error("Error deleting data:", error.response || error.message);
      setErrorMessage("Gagal menghapus data materi.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} size="sm" className="p-6">
      <DialogBody className="mt-2 mb-2">
        <Typography>Yakin untuk menghapus data?</Typography>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              fullWidth
              onClick={onClose}
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue"
            >
              Batal
            </Button>
          </div>
          <div>
            <Button
              fullWidth
              onClick={() => handleDelete(tugas.id)} // Pastikan uuid yang digunakan
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal"
            >
              Hapus
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
