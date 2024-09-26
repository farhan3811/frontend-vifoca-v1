import React, { useState, useEffect } from "react";
import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import axios from "axios";

export default function DeleteModal({ user, open, onClose, getUsers }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_LOCAL; 
  const handleDelete = async (userId) => {
    try {
    await axios.delete(`${API_URL}/users/${userId}`);
    getUsers();
    setSuccessMessage("Data berhasil dihapus!");
    onClose();
    } catch (error) {
      console.error("Error deleting data:", error);
      setErrorMessage("Gagal menghapus data siswa.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} size="sm" className="p-6 rounded">
      <DialogBody className="mt-2 mb-2">
        <Typography>Yakin Untuk Menghapus Data ?</Typography>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Button
              fullWidth
              onClick={onClose}
              className="flex items-center rounded justify-center gap-2 mt-6 normal-case font-title font-medium bg-blue"
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
              onClick={() => handleDelete(user.uuid)}
              className="flex items-center rounded justify-center gap-2 mt-6 normal-case font-title font-medium bg-batal"
            >
                    <svg
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M8.51465 13H9.26465C9.45215 13 9.63965 12.8438 9.63965 12.625V5.875C9.63965 5.6875 9.45215 5.5 9.26465 5.5H8.51465C8.2959 5.5 8.13965 5.6875 8.13965 5.875V12.625C8.13965 12.8438 8.2959 13 8.51465 13ZM13.6396 2.5H11.0459L9.9834 0.75C9.7334 0.3125 9.2334 0 8.70215 0H5.5459C5.01465 0 4.51465 0.3125 4.26465 0.75L3.20215 2.5H0.608398C0.358398 2.5 0.170898 2.6875 0.170898 2.875V3.625C0.170898 3.8125 0.358398 4 0.608398 4H1.1709V14.625C1.1709 15.4375 1.8114 16 2.6084 16H11.6084C12.4059 16 13.0459 15.4375 13.0459 14.625V4H13.6084C13.8584 4 14.0459 3.8125 14.0459 3.625V2.875C14.0459 2.6875 13.8584 2.5 13.6396 2.5ZM5.9209 1.5C6.1084 1.5 6.2959 1.3125 6.2959 1.125V0.375C6.2959 0.1875 6.1084 0 5.9209 0H4.0799C3.8924 0 3.7049 0.1875 3.7049 0.375V1.125C3.7049 1.3125 3.8924 1.5 4.0799 1.5H5.9209ZM11.6084 14.625H2.6084V4H11.6084V14.625Z"
                        fill="white"
                     />
                        </svg>
              Hapus
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
