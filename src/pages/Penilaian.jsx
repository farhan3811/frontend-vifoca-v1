import React, { useEffect } from "react";
import Layout from "./Layout";
import Penilaian from "../components/Penilaian/Mahasiswa/PenilaianMahasiswa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Materi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <Penilaian />
    </Layout>
  );
};

export default Materi;
