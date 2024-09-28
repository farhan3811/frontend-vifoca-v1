import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      setMessage(response.data.msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setMessage(error.response?.data?.msg || "Terjadi kesalahan. Coba lagi.");
    }
  };

  return (
    <div className="flex justify-center place-content-end py-20 lg:px-20">
      <Card className="w-96 py-8 px-4">
        <div className="text-center">
          <form onSubmit={handleSubmit}>
          {message && <p>{message}</p>}
            {isError && <p className="text-red-500">{message}</p>}
            <Typography variant="h3" color="black" className="font-title">
              Lupa Password
            </Typography>
            <Typography color="black" className="font-title text-sm">
              Masukkan Email Anda untuk reset password
            </Typography>
            <CardBody className="flex flex-col">
              <div className="mb-2">
                <Typography className="flex justify-start mb-2 font-title font-medium">
                  Email
                </Typography>
                <label className="input input-bordered flex items-center gap-2 bg-white border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 16"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      d="M9.78125 9.5C8.875 9.5 8.46875 10 7 10C5.5 10 5.09375 9.5 4.1875 9.5C1.875 9.5 0 11.4062 0 13.7188V14.5C0 15.3438 0.65625 16 1.5 16H12.5C13.3125 16 14 15.3438 14 14.5V13.7188C14 11.4062 12.0938 9.5 9.78125 9.5ZM12.5 14.5H1.5V13.7188C1.5 12.2188 2.6875 11 4.1875 11C4.65625 11 5.375 11.5 7 11.5C8.59375 11.5 9.3125 11 9.78125 11C11.2812 11 12.5 12.2188 12.5 13.7188V14.5ZM7 9C9.46875 9 11.5 7 11.5 4.5C11.5 2.03125 9.46875 0 7 0C4.5 0 2.5 2.03125 2.5 4.5C2.5 7 4.5 9 7 9ZM7 1.5C8.625 1.5 10 2.875 10 4.5C10 6.15625 8.625 7.5 7 7.5C5.34375 7.5 4 6.15625 4 4.5C4 2.875 5.34375 1.5 7 1.5Z"
                      fill="#999999"
                    />
                  </svg>
                  <input
                    type="email"
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                    required
                  />
                </label>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-blue font-title font-medium rounded"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Kirim"}
              </Button>
              <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-400 before:me-6 after:flex-1 after:border-t after:border-gray-400 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                Atau
              </div>
              <Link to="/">
                <Button
                  className="bg-white text-black border-2 font-title font-medium rounded"
                  fullWidth
                >
                  Login
                </Button>
              </Link>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
