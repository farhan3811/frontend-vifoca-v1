import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Layout from "../pages/Layout";

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
  const [data, setData] = useState({
    totalTugas: 0,
    totalMateri: 0,
    totalPenilaian: 0,
    totalUser: 0,
    tugasDetails: [],
    tugasPerHari: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_LOCAL;

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, [API_URL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const barChartData = data.tugasPerHari.map((item) => ({
    x: format(new Date(item.tanggal), "dd/MM/yyyy"), 
    y: Number(item.jumlah_tugas) || 0,
  }));

  return (
    <Layout>
    <div className="w-full">
      <div className="card rounded-none card-side bg-base-100 shadow-xl px-16 pb-10 pt-10 bg-white">
        <div className="flex-col">
          <div>
            <div className="flex flex-nowrap gap-4">
              <div>
                <Card className="mt-6 w-56 bg-gradient-to-t from-materib to-materit">
                  <CardBody>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-2 flex items-center justify-center font-title font-medium"
                    >
                      {data.totalMateri}
                    </Typography>
                    <Typography className="flex justify-end text-white font-title font-medium text-xs">
                      Materi
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              {user.role === "admin" && (
              <div>
                <Card className="mt-6 w-56 bg-gradient-to-t from-mahat to-mahab">
                  <CardBody>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-2 flex items-center justify-center font-title font-medium"
                    >
                      {data.totalUser}
                    </Typography>
                    <Typography className="flex justify-end text-white font-title font-medium text-xs">
                      User
                    </Typography>
                  </CardBody>
                </Card>
              </div>
                            )}
              <div>
                <Card className="mt-6 w-56 bg-gradient-to-t from-latihant to-latihanb">
                  <CardBody>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-2 flex items-center justify-center font-title font-medium"
                    >
                      {data.totalTugas}
                    </Typography>
                    <Typography className="flex justify-end text-white font-title font-medium text-xs">
                      Latihan
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-56 bg-gradient-to-t from-penilaiant to-penilaianb">
                  <CardBody>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-2 flex items-center justify-center font-title font-medium"
                    >
                      {data.totalPenilaian}
                    </Typography>
                    <Typography className="flex justify-end text-white font-title font-medium text-xs">
                      Penilaian
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-nowrap">
              <div>
                <Card className="mt-6 w-full">
                  <CardBody>
                    <Typography variant="h5" color="gray" className="mb-2">
                      Statistik Tugas
                    </Typography>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: "band",
                          data: barChartData.map((item) => item.x),
                        },
                      ]}
                      series={[{ data: barChartData.map((item) => item.y) }]}
                      width={500}
                      height={300}
                    />
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-96 ml-4">
                  <CardBody>
                    <Typography variant="h5" color="gray" className="mb-2">
                      Statistik
                    </Typography>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: data.totalMateri, label: "Materi" },
                            { id: 1, value: data.totalTugas, label: "Latihan" },
                            {
                              id: 2,
                              value: data.totalPenilaian,
                              label: "Penilaian",
                            },
                          ],
                        },
                      ]}
                      width={350}
                      height={200}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
