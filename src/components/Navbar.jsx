import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="navbar bg-white flex items-center px-20 shadow-md">
      <div className="flex-none">
        <NavLink to="/dashboard" className="navbar-item">
          <img src={logo} width="150" height="40" alt="logo" />
        </NavLink>
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="menu menu-horizontal px-1 flex space-x-4">
          {/* Start Mahasiswa Only*/}
          {user && user.role === "mahasiswa" && (
            <li>
              <NavLink 
                to="/mahasiswa/materi" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Materi
              </NavLink>
            </li>
          )}
          {user && user.role === "mahasiswa" && (
            <li>
              <NavLink 
                to="/#" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Penilaian
              </NavLink>
            </li>
          )}
          {user && user.role === "mahasiswa" && (
            <li>
              <NavLink 
                to="/#" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Tentang
              </NavLink>
            </li>
          )}
          {/* Start Mahasiswa End*/}
          {/* Start Admin dan Dosen */}
          {user && (user.role === "admin" || user.role === "user") && (
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Beranda
              </NavLink>
            </li>
          )}
          {user && (user.role === "admin" ) && (
            <li>
              <NavLink 
                to="/materi" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Materi
              </NavLink>
            </li>
          )}
          {user && (user.role === "admin" || user.role === "user") && (
            <li>
              <NavLink 
                to="/tugas" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Tugas
              </NavLink>
            </li>
          )}
                    {user && (user.role === "admin" || user.role === "user") && (
            <li>
              <NavLink 
                to="/users" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Mahasiswa
              </NavLink>
            </li>
          )}
          {user && (user.role === "admin" || user.role === "user") && (
            <li>
              <NavLink 
                to="/#" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'bg-transparent text-blue-500' : 'text-gray-800'}` // Transparent if active
                }
              >
                Penilaian
              </NavLink>
            </li>
          )}



          {/* End Admin dan Dosen */}

        </ul>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10">
              <img
                className="rounded-full"
                alt="User Avatar"
                src={
                  user?.avatar ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold">{user?.name || "Nama Pengguna"}</p>
              <p className="text-gray-500">{user?.nim || "NIM"}</p>
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profil" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
