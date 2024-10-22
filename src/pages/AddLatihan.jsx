import React, { useEffect } from "react";
import Layout from "./Layout";
import MateriList from "../components/Tugas/AddTugas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Materi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin" && user.role !== "user") {
      navigate("../../404");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <MateriList />
    </Layout>
  );
};

export default Materi;
