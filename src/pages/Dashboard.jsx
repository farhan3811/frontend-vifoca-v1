import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
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
      navigate("/mahasiswa/materi");
    }
  }, [isError, navigate, user]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
