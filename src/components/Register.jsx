import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Password and confirmation password do not match.");
      return;
    }

    const API_URL =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL_PROD
        : process.env.REACT_APP_API_URL_LOCAL;

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        nim,
        password,
        role: "mahasiswa",
      });

      alert(response.data.msg);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "An error occurred.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center mt-10 pb-20">
        <Card className="lg:w-4/12 py-8 px-4 sm:w-80">
          <div className="text-center">
            <Typography variant="h3" color="black" className="font-title">
              Daftar
            </Typography>
            <Typography color="black" className="font-title text-sm">
              Masukkan NPM dan password Anda untuk melakukan pendaftaran
            </Typography>
          </div>
          <CardBody className="flex flex-col">
            <div className="mb-4">
              <Typography className="font-title font-medium">Nama</Typography>
              <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                <input
                  type="text"
                  className="grow"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <Typography className="font-title font-medium">NPM</Typography>
              <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                <input
                  type="text"
                  className="grow bg-white"
                  placeholder="NPM"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <Typography className="font-title font-medium">E-mail</Typography>
              <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                <input
                  type="email"
                  className="grow bg-white"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <Typography className="font-title font-medium">
                Password
              </Typography>
              <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                <input
                  type="password"
                  className="grow bg-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <Typography className="font-title font-medium">
                Confirm Password
              </Typography>
              <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                <input
                  type="password"
                  className="grow bg-white"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          </CardBody>
          {errorMessage && (
            <div className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </div>
          )}
          <CardFooter className="pt-0">
            <Button
              onClick={handleSubmit}
              className="bg-blue font-title font-medium"
              fullWidth
            >
              Daftar
            </Button>
            <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-400 before:me-6 after:flex-1 after:border-t after:border-gray-400 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
              Atau
            </div>
            <Link to="/">
              <Button
                className="bg-white text-black border-2 font-title font-medium"
                fullWidth
              >
                Masuk
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
