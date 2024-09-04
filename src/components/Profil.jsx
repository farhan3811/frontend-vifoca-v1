import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
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

const Profil = () => {
  const [formData, setFormData] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
    },
  ];
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      deadline: date,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="container px-20 pb-20">
      <Breadcumbs />
      <div className="card card-side bg-base-100 shadow-xl w-5/6 px-20 pt-10">
        <div className="grid grid-rows-2">
          <div>
            <div className="avatar mt-16">
              {" "}
              <div className="w-52 h-52 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
                  <div className="flex items-center gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <TabPanel value="profile">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Nama Lengkap</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Ahmad Putut"
                      className="input input-bordered w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Program Studi</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="S1 Informatika"
                      className="input input-bordered w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Tanggal Lahir</Typography>
                  </div>
                  <div className="col-span-2">
                  <DatePicker
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="Pp"
                      className="border rounded p-2 w-60"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>NPM/NIDN</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="1234567"
                      className="input input-bordered w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Email</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="vifoca@gmail.com"
                      className="input input-bordered w-full max-w-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Nomor HP</Typography>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="085924467356"
                      className="input input-bordered w-full max-w-sm"
                    />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="settings">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Password Lama</Typography>
                  </div>
                  <div className="col-span-2">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="h-4 w-4 opacity-70"
                      >
                        <path
                          d="M10 1.5C12.4688 1.5 14.5 3.53125 14.5 6C14.5 8.5 12.4688 10.5 10 10.5C9.40625 10.5 8.8125 10.4062 8.3125 10.1875L7 11.5H6V13H4.5V14.5H1.5V11.5L5.6875 7.3125C5.5625 6.90625 5.5 6.46875 5.5 6.03125C5.5 6.03125 5.5 6.03125 5.5 6C5.5 3.53125 7.5 1.5 10 1.5ZM10 0C6.65625 0 4 2.6875 4 6C4 6.28125 4 6.5625 4.03125 6.84375L0.21875 10.6875C0.0625 10.8125 0 11 0 11.2188V15.25C0 15.6875 0.3125 16 0.75 16H5.25C5.65625 16 6 15.6875 6 15.25V14.5H6.75C7.15625 14.5 7.5 14.1875 7.5 13.75V13.125L8.75 11.875C9.15625 11.9688 9.5625 12 10 12C13.3125 12 16 9.34375 16 6C16 2.6875 13.3125 0 10 0ZM10 4.5C10 5.34375 10.6562 6 11.5 6C12.3125 6 13 5.34375 13 4.5C13 3.6875 12.3125 3 11.5 3C10.6562 3 10 3.6875 10 4.5Z"
                          fill="#999999"
                        />
                      </svg>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="grow"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 focus:outline-none"
                      >
                        {passwordVisible ? (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 19 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.13965 2.5C8.7959 2.53125 8.45215 2.5625 8.13965 2.65625C8.2959 2.90625 8.3584 3.21875 8.38965 3.5C8.38965 4.46875 7.57715 5.25 6.63965 5.25C6.32715 5.25 6.01465 5.1875 5.7959 5.03125C5.70215 5.34375 5.63965 5.65625 5.63965 6C5.63965 7.9375 7.20215 9.5 9.13965 9.5C11.0771 9.5 12.6396 7.9375 12.6396 6C12.6396 4.09375 11.0771 2.53125 9.13965 2.53125V2.5ZM18.0146 5.5625C16.3271 2.25 12.9521 0 9.13965 0C5.2959 0 1.9209 2.25 0.233398 5.5625C0.170898 5.6875 0.139648 5.84375 0.139648 6C0.139648 6.1875 0.170898 6.34375 0.233398 6.46875C1.9209 9.78125 5.2959 12 9.13965 12C12.9521 12 16.3271 9.78125 18.0146 6.46875C18.0771 6.34375 18.1084 6.1875 18.1084 6.03125C18.1084 5.84375 18.0771 5.6875 18.0146 5.5625ZM9.13965 10.5C6.0459 10.5 3.20215 8.78125 1.70215 6C3.20215 3.21875 6.0459 1.5 9.13965 1.5C12.2021 1.5 15.0459 3.21875 16.5459 6C15.0459 8.78125 12.2021 10.5 9.13965 10.5Z"
                              fill="#999999"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 16"
                            className="h-4 w-4"
                          >
                            <path
                              d="M20.8125 14.7188L2.125 0.125C2.03125 0.0625 1.90625 0.03125 1.8125 0.03125C1.625 0.03125 1.5 0.09375 1.40625 0.1875L1.09375 0.59375C1.03125 0.6875 0.96875 0.78125 0.96875 0.90625C0.96875 1.0625 1.0625 1.21875 1.1875 1.28125L19.875 15.9062C19.9375 15.9688 20.0625 16 20.1562 16C20.3438 16 20.4688 15.9375 20.5625 15.8125L20.875 15.4375C20.9375 15.3438 21 15.25 21 15.125C21 14.9688 20.9062 14.8125 20.8125 14.7188ZM10.25 4.59375L14.4688 7.875C14.4062 6 12.875 4.5 11 4.5C10.75 4.53125 10.5 4.53125 10.25 4.59375ZM11.7188 11.4375L7.5 8.15625C7.5625 10.0312 9.09375 11.5 11 11.5C11.2188 11.5 11.4688 11.5 11.7188 11.4375ZM11 3.5C14.0625 3.5 16.9062 5.21875 18.4062 8C18.0312 8.71875 17.5938 9.34375 17.0312 9.90625L18.2188 10.8125C18.875 10.125 19.4375 9.34375 19.875 8.46875C19.9375 8.34375 20 8.1875 20 8.03125C20 7.84375 19.9375 7.6875 19.875 7.5625C18.1875 4.25 14.8125 2 11 2C9.84375 2 8.75 2.21875 7.71875 2.59375L9.15625 3.75C9.75 3.59375 10.375 3.5 11 3.5ZM11 12.5C7.90625 12.5 5.0625 10.7812 3.5625 8C3.9375 7.3125 4.375 6.6875 4.9375 6.125L3.75 5.21875C3.09375 5.90625 2.53125 6.6875 2.09375 7.5625C2.03125 7.6875 2 7.84375 2 8C2 8.1875 2.03125 8.34375 2.09375 8.46875C3.78125 11.7812 7.15625 14 11 14C12.125 14 13.2188 13.7812 14.25 13.4375L12.8125 12.2812C12.2188 12.4375 11.5938 12.5 11 12.5Z"
                              fill="#999999"
                            />
                          </svg>
                        )}
                      </button>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Password Baru</Typography>
                  </div>
                  <div className="col-span-2">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="h-4 w-4 opacity-70"
                      >
                        <path
                          d="M10 1.5C12.4688 1.5 14.5 3.53125 14.5 6C14.5 8.5 12.4688 10.5 10 10.5C9.40625 10.5 8.8125 10.4062 8.3125 10.1875L7 11.5H6V13H4.5V14.5H1.5V11.5L5.6875 7.3125C5.5625 6.90625 5.5 6.46875 5.5 6.03125C5.5 6.03125 5.5 6.03125 5.5 6C5.5 3.53125 7.5 1.5 10 1.5ZM10 0C6.65625 0 4 2.6875 4 6C4 6.28125 4 6.5625 4.03125 6.84375L0.21875 10.6875C0.0625 10.8125 0 11 0 11.2188V15.25C0 15.6875 0.3125 16 0.75 16H5.25C5.65625 16 6 15.6875 6 15.25V14.5H6.75C7.15625 14.5 7.5 14.1875 7.5 13.75V13.125L8.75 11.875C9.15625 11.9688 9.5625 12 10 12C13.3125 12 16 9.34375 16 6C16 2.6875 13.3125 0 10 0ZM10 4.5C10 5.34375 10.6562 6 11.5 6C12.3125 6 13 5.34375 13 4.5C13 3.6875 12.3125 3 11.5 3C10.6562 3 10 3.6875 10 4.5Z"
                          fill="#999999"
                        />
                      </svg>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="grow"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 focus:outline-none"
                      >
                        {passwordVisible ? (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 19 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.13965 2.5C8.7959 2.53125 8.45215 2.5625 8.13965 2.65625C8.2959 2.90625 8.3584 3.21875 8.38965 3.5C8.38965 4.46875 7.57715 5.25 6.63965 5.25C6.32715 5.25 6.01465 5.1875 5.7959 5.03125C5.70215 5.34375 5.63965 5.65625 5.63965 6C5.63965 7.9375 7.20215 9.5 9.13965 9.5C11.0771 9.5 12.6396 7.9375 12.6396 6C12.6396 4.09375 11.0771 2.53125 9.13965 2.53125V2.5ZM18.0146 5.5625C16.3271 2.25 12.9521 0 9.13965 0C5.2959 0 1.9209 2.25 0.233398 5.5625C0.170898 5.6875 0.139648 5.84375 0.139648 6C0.139648 6.1875 0.170898 6.34375 0.233398 6.46875C1.9209 9.78125 5.2959 12 9.13965 12C12.9521 12 16.3271 9.78125 18.0146 6.46875C18.0771 6.34375 18.1084 6.1875 18.1084 6.03125C18.1084 5.84375 18.0771 5.6875 18.0146 5.5625ZM9.13965 10.5C6.0459 10.5 3.20215 8.78125 1.70215 6C3.20215 3.21875 6.0459 1.5 9.13965 1.5C12.2021 1.5 15.0459 3.21875 16.5459 6C15.0459 8.78125 12.2021 10.5 9.13965 10.5Z"
                              fill="#999999"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 16"
                            className="h-4 w-4"
                          >
                            <path
                              d="M20.8125 14.7188L2.125 0.125C2.03125 0.0625 1.90625 0.03125 1.8125 0.03125C1.625 0.03125 1.5 0.09375 1.40625 0.1875L1.09375 0.59375C1.03125 0.6875 0.96875 0.78125 0.96875 0.90625C0.96875 1.0625 1.0625 1.21875 1.1875 1.28125L19.875 15.9062C19.9375 15.9688 20.0625 16 20.1562 16C20.3438 16 20.4688 15.9375 20.5625 15.8125L20.875 15.4375C20.9375 15.3438 21 15.25 21 15.125C21 14.9688 20.9062 14.8125 20.8125 14.7188ZM10.25 4.59375L14.4688 7.875C14.4062 6 12.875 4.5 11 4.5C10.75 4.53125 10.5 4.53125 10.25 4.59375ZM11.7188 11.4375L7.5 8.15625C7.5625 10.0312 9.09375 11.5 11 11.5C11.2188 11.5 11.4688 11.5 11.7188 11.4375ZM11 3.5C14.0625 3.5 16.9062 5.21875 18.4062 8C18.0312 8.71875 17.5938 9.34375 17.0312 9.90625L18.2188 10.8125C18.875 10.125 19.4375 9.34375 19.875 8.46875C19.9375 8.34375 20 8.1875 20 8.03125C20 7.84375 19.9375 7.6875 19.875 7.5625C18.1875 4.25 14.8125 2 11 2C9.84375 2 8.75 2.21875 7.71875 2.59375L9.15625 3.75C9.75 3.59375 10.375 3.5 11 3.5ZM11 12.5C7.90625 12.5 5.0625 10.7812 3.5625 8C3.9375 7.3125 4.375 6.6875 4.9375 6.125L3.75 5.21875C3.09375 5.90625 2.53125 6.6875 2.09375 7.5625C2.03125 7.6875 2 7.84375 2 8C2 8.1875 2.03125 8.34375 2.09375 8.46875C3.78125 11.7812 7.15625 14 11 14C12.125 14 13.2188 13.7812 14.25 13.4375L12.8125 12.2812C12.2188 12.4375 11.5938 12.5 11 12.5Z"
                              fill="#999999"
                            />
                          </svg>
                        )}
                      </button>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Typography>Konfirmasi Password Baru</Typography>
                  </div>
                  <div className="col-span-2">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        className="h-4 w-4 opacity-70"
                      >
                        <path
                          d="M10 1.5C12.4688 1.5 14.5 3.53125 14.5 6C14.5 8.5 12.4688 10.5 10 10.5C9.40625 10.5 8.8125 10.4062 8.3125 10.1875L7 11.5H6V13H4.5V14.5H1.5V11.5L5.6875 7.3125C5.5625 6.90625 5.5 6.46875 5.5 6.03125C5.5 6.03125 5.5 6.03125 5.5 6C5.5 3.53125 7.5 1.5 10 1.5ZM10 0C6.65625 0 4 2.6875 4 6C4 6.28125 4 6.5625 4.03125 6.84375L0.21875 10.6875C0.0625 10.8125 0 11 0 11.2188V15.25C0 15.6875 0.3125 16 0.75 16H5.25C5.65625 16 6 15.6875 6 15.25V14.5H6.75C7.15625 14.5 7.5 14.1875 7.5 13.75V13.125L8.75 11.875C9.15625 11.9688 9.5625 12 10 12C13.3125 12 16 9.34375 16 6C16 2.6875 13.3125 0 10 0ZM10 4.5C10 5.34375 10.6562 6 11.5 6C12.3125 6 13 5.34375 13 4.5C13 3.6875 12.3125 3 11.5 3C10.6562 3 10 3.6875 10 4.5Z"
                          fill="#999999"
                        />
                      </svg>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="grow"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 focus:outline-none"
                      >
                        {passwordVisible ? (
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 19 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.13965 2.5C8.7959 2.53125 8.45215 2.5625 8.13965 2.65625C8.2959 2.90625 8.3584 3.21875 8.38965 3.5C8.38965 4.46875 7.57715 5.25 6.63965 5.25C6.32715 5.25 6.01465 5.1875 5.7959 5.03125C5.70215 5.34375 5.63965 5.65625 5.63965 6C5.63965 7.9375 7.20215 9.5 9.13965 9.5C11.0771 9.5 12.6396 7.9375 12.6396 6C12.6396 4.09375 11.0771 2.53125 9.13965 2.53125V2.5ZM18.0146 5.5625C16.3271 2.25 12.9521 0 9.13965 0C5.2959 0 1.9209 2.25 0.233398 5.5625C0.170898 5.6875 0.139648 5.84375 0.139648 6C0.139648 6.1875 0.170898 6.34375 0.233398 6.46875C1.9209 9.78125 5.2959 12 9.13965 12C12.9521 12 16.3271 9.78125 18.0146 6.46875C18.0771 6.34375 18.1084 6.1875 18.1084 6.03125C18.1084 5.84375 18.0771 5.6875 18.0146 5.5625ZM9.13965 10.5C6.0459 10.5 3.20215 8.78125 1.70215 6C3.20215 3.21875 6.0459 1.5 9.13965 1.5C12.2021 1.5 15.0459 3.21875 16.5459 6C15.0459 8.78125 12.2021 10.5 9.13965 10.5Z"
                              fill="#999999"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 16"
                            className="h-4 w-4"
                          >
                            <path
                              d="M20.8125 14.7188L2.125 0.125C2.03125 0.0625 1.90625 0.03125 1.8125 0.03125C1.625 0.03125 1.5 0.09375 1.40625 0.1875L1.09375 0.59375C1.03125 0.6875 0.96875 0.78125 0.96875 0.90625C0.96875 1.0625 1.0625 1.21875 1.1875 1.28125L19.875 15.9062C19.9375 15.9688 20.0625 16 20.1562 16C20.3438 16 20.4688 15.9375 20.5625 15.8125L20.875 15.4375C20.9375 15.3438 21 15.25 21 15.125C21 14.9688 20.9062 14.8125 20.8125 14.7188ZM10.25 4.59375L14.4688 7.875C14.4062 6 12.875 4.5 11 4.5C10.75 4.53125 10.5 4.53125 10.25 4.59375ZM11.7188 11.4375L7.5 8.15625C7.5625 10.0312 9.09375 11.5 11 11.5C11.2188 11.5 11.4688 11.5 11.7188 11.4375ZM11 3.5C14.0625 3.5 16.9062 5.21875 18.4062 8C18.0312 8.71875 17.5938 9.34375 17.0312 9.90625L18.2188 10.8125C18.875 10.125 19.4375 9.34375 19.875 8.46875C19.9375 8.34375 20 8.1875 20 8.03125C20 7.84375 19.9375 7.6875 19.875 7.5625C18.1875 4.25 14.8125 2 11 2C9.84375 2 8.75 2.21875 7.71875 2.59375L9.15625 3.75C9.75 3.59375 10.375 3.5 11 3.5ZM11 12.5C7.90625 12.5 5.0625 10.7812 3.5625 8C3.9375 7.3125 4.375 6.6875 4.9375 6.125L3.75 5.21875C3.09375 5.90625 2.53125 6.6875 2.09375 7.5625C2.03125 7.6875 2 7.84375 2 8C2 8.1875 2.03125 8.34375 2.09375 8.46875C3.78125 11.7812 7.15625 14 11 14C12.125 14 13.2188 13.7812 14.25 13.4375L12.8125 12.2812C12.2188 12.4375 11.5938 12.5 11 12.5Z"
                              fill="#999999"
                            />
                          </svg>
                        )}
                      </button>
                    </label>
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
          <div className="flex justify-end mr-4">
            <button className="btn bg-blue text-white w-44 font-title font-medium">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
