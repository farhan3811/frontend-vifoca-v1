import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import Breadcumbs from "./Breadcumbs";
import UpdatePassword from "./ProfilPassword";

const Profil = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [fileName, setFileName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibles, setPasswordVisibles] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [oldNim, setOldNim] = useState("");
  const [tgllahir, setTgllahir] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    prodi: "",
    tgllahir: "",
    nim: "",
    email: "",
    nomorhp: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${id}`)
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          const dateOfBirth = new Date(response.data.tgllahir);
          setTgllahir(dateOfBirth);

          setFormData({
            name: response.data.name,
            prodi: response.data.prodi,
            nim: response.data.nim,
            tgllahir: response.data.tgllahir,
            email: response.data.email,
            nomorhp: response.data.nomorhp,
            avatar: response.data.avatar,
          });
          setOldNim(response.data.nim);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setErrorMessage("Error fetching profile data");
      });
  }, [id, API_URL]);

  const handleDateChange = (date) => {
    setTgllahir(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const updatedData = {
      ...formData,
      tgllahir: tgllahir ? tgllahir.toISOString().split("T")[0] : null,
      nim: formData.nim === oldNim ? oldNim : formData.nim,
    };

    if (!formData.nim) {
      delete updatedData.nim;
    }

    try {
      const formDataToSubmit = new FormData();

      for (const key in updatedData) {
        formDataToSubmit.append(key, updatedData[key]);
      }

      if (avatarFile) {
        formDataToSubmit.append("avatar", avatarFile);
      }

      await axios.patch(`${API_URL}/users/${id}`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.msg || "Update failed");
      } else {
        setErrorMessage("Error updating profile");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setFileName(file ? file.name : "");

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getDefaultAvatar = () => {
    return "https://via.placeholder.com/150";
  };

  const data = [
    { label: "Profile", value: "profile", icon: UserCircleIcon },
    { label: "Settings", value: "settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="container px-20 pb-20">
      <Breadcumbs />
      <div className="card card-side bg-white shadow-xl w-5/6 px-20 pt-10">
        <div className="grid grid-rows-2">
          <div>
            <div className="avatar mt-16">
              <div className="w-52 h-52 rounded-full">
                <img
                  src={
                    formData.avatar
                      ? `${API_URL}/${formData.avatar}`
                      : getDefaultAvatar()
                  }
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="file"
              id="file-input"
              accept="image/*"
              className="w-0 h-0"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-input"
              className="input flex w-24 h-8 justify-center items-center gap-2 cursor-pointer relative bg-edit"
            >
              <span className="text-white flex justify-center items-center text-xs">
                {fileName || "Ganti Profil"}
              </span>
            </label>
          </div>
        </div>

        <div className="card-body">
          <Tabs value="profile">
            <TabsHeader>
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value}>
                  <div className="flex formDatas-center gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <TabPanel value="profile">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>Nama Lengkap</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="Ahmad Putut"
                      className="input input-bordered border-gray-300 bg-white w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>Program Studi</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="prodi"
                      value={formData.prodi || ""}
                      onChange={handleInputChange}
                      placeholder="S1 Informatika"
                      className="input input-bordered border-gray-300 bg-white w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>Tanggal Lahir</Typography>
                  </div>
                  <div className=" w-full max-w-sm">
                    <DatePicker
                      className="col-span-2 border-2 border-gray-300 bg-white rounded-xl py-2.5 pr-20 pl-4"
                      selected={tgllahir}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      isClearable
                      placeholderText="Pilih Tanggal"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>NPM/NIDN</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim || ""}
                      onChange={handleInputChange}
                      placeholder="1234567"
                      className="input input-bordered border-gray-300 bg-white w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>Email</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder="example@mail.com"
                      className="input input-bordered border-gray-300 bg-white w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex formDatas-center">
                    <Typography>Nomor HP</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="nomorhp"
                      value={formData.nomorhp || ""}
                      onChange={handleInputChange}
                      placeholder="08123456789"
                      className="input input-bordered border-gray-300 bg-white w-full max-w-sm"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue font-title font-medium py-2 px-8 text-white rounded"
                  >
                    Simpan
                  </button>
                </div>
              </TabPanel>
              <TabPanel value="settings">
                <UpdatePassword />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profil;
