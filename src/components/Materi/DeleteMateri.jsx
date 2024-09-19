import React, { useState } from "react";
import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";

export default function DeleteModal({ materi, open, onClose, getMateri }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL;
  const handleDelete = async (materiid) => {
    try {
      console.log('Menghapus materi dengan ID:', materiid);
      await axios.delete(`${API_URL}/api/${materiid}`);
      getMateri();
      setSuccessMessage("Data berhasil dihapus!"); 
      onClose();
    } catch (error) {
      console.error("Error deleting data:", error.response || error.message);
      setErrorMessage("Gagal menghapus data materi.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} size="sm" className="p-6 rounded">
      <DialogBody className="mt-2 mb-2">
        <Typography>Yakin untuk menghapus data?</Typography>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              fullWidth
              onClick={onClose}
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue rounded"
            >
              Batal
            </Button>
          </div>
          <div>
            <Button
              fullWidth
              onClick={() => handleDelete(materi.id)} 
              className="flex items-center justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal rounded"
            >
              Hapus
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
