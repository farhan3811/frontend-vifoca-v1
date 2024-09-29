import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const UpdatePassword = () => {
  const { id } = useParams();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setErrorMsg("Password dan Konfirmasi Password tidak sama");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/password/${id}`, {
        oldPassword,
        newPassword: password,
      });
      setSuccessMsg(response.data.msg);
      setErrorMsg("");
      setOldPassword("");
      setPassword("");
      setConfPassword("");
    } catch (error) {
      setErrorMsg(
        error.response ? error.response.data.msg : "Gagal mengupdate password"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleUpdatePassword}>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {successMsg && <p className="text-green-500">{successMsg}</p>}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Typography>Password Lama</Typography>
          </div>
          <div className="col-span-2">
            <label className="input bg-white input-bordered flex items-center gap-2">
              <input
                type={passwordVisible ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="grow"
                placeholder="Password Lama"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-500 focus:outline-none"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Typography>Password Baru</Typography>
          </div>
          <div className="col-span-2">
            <label className="input bg-white input-bordered flex items-center gap-2">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grow"
                placeholder="Password Baru"
                required
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Typography>Konfirmasi Password</Typography>
          </div>
          <div className="col-span-2">
            <label className="input bg-white input-bordered flex items-center gap-2">
              <input
                type={passwordVisible ? "text" : "password"}
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                className="grow"
                placeholder="Konfirmasi Password"
                required
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue font-title font-medium py-2 px-8 text-white rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
