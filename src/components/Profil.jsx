import React from "react";
import { Typography } from "@material-tailwind/react";
import Breadcumbs from "./Breadcumbs";

const Profil = () => {
  return (
    <div className="container">
      <Breadcumbs/>
      <div className="card card-side bg-base-100 shadow-xl w-4/6 px-20 py-10">
        <div className="avatar mt-10">
          <div className="w-56 h-56 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>Nama Lengkap</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="Ahmad Putut"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>Program Studi</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="S1 Informatika"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>Tanggal Lahir</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>NPM/NIDN</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="1234567"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>Email</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="vifoca@gmail.com"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              {" "}
              <Typography>Nomor HP</Typography>
            </div>
            <div className="col-span-2">
              {" "}
              <input
                type="text"
                placeholder="085924467356"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
          <button className="btn bg-blue text-white w-44 font-title font-medium">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
