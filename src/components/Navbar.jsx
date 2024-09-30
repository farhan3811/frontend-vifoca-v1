import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset, getMe } from "../features/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;
  const getDefaultAvatar = () => {
    return "https://via.placeholder.com/150";
  };
  return (
    <div className="navbar bg-white flex items-center justify-between px-4 lg:px-20 shadow-md">
      {/* Logo */}
      <div className="flex-none">
        <NavLink to="/dashboard" className="navbar-item">
          <img src={logo} width="150" height="40" alt="logo" />
        </NavLink>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`lg:flex ${
          isMenuOpen ? "block" : "hidden"
        } lg:flex-1 lg:justify-center`}
      >
        <ul className="menu menu-horizontal flex-col lg:flex-row lg:space-x-4 lg:px-1">
          {/* Mahasiswa Only */}
          {user && user.role === "mahasiswa" && (
            <>
              <li>
                <NavLink
                  to="/mahasiswa/materi"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Materi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/mahasiswa/penilaian/${user.uuid}`}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Penilaian
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Tentang
                </NavLink>
              </li>
            </>
          )}

          {/* Admin dan Dosen */}
          {user && (user.role === "admin" || user.role === "user") && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Beranda
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/materi"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Materi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/latihan"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Latihan
                </NavLink>
              </li>
              {user.role === "admin" && (
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                    }
                  >
                    Mahasiswa
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/penilaian"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-blue-500" : "text-gray-800"}`
                  }
                >
                  Penilaian
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* User Profile Section */}
      <div className="dropdown dropdown-end hidden lg:block bg-white">
        <div tabIndex={0} role="button">
          <div className="flex items-center gap-2 bg-white">
            <div>
              <img
                className="rounded-full w-12 h-12 "
                src={
                  user?.avatar
                    ? `${API_URL}/${user?.avatar}`
                    : getDefaultAvatar()
                }
                alt="Profile"
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-500">
                {user?.name || "Nama Pengguna"}
              </p>
              <p className="text-gray-500">{user?.nim || "NIM"}</p>
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu bg-white menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <NavLink to={`/profile/${user?.uuid}`} className="justify-between">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user?.uuid}`} className="justify-between">
              Settings
            </NavLink>
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
