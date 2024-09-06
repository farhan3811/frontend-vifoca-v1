import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Dashboard = () => {
  const dataset = [
    { x: 1, y: 2 },
    { x: 2, y: 5.5 },
    { x: 3, y: 2 },
    { x: 5, y: 8.5 },
    { x: 8, y: 1.5 },
    { x: 10, y: 5 },
  ];
  return (
    <div className="w-full">
      <div className="card rounded-none card-side bg-base-100 shadow-xl px-16 pb-10">
        {" "}
        <div className="flex-col">
          <div>
            <div className="flex flex-nowrap gap-4">
              <div>
                <Card className="mt-6 w-56">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-56">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-56">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className="mt-6 w-56">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-nowrap">
              <div>
                {" "}
                <Card className="mt-6 w-full">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Latihan
                    </Typography>
                    <Typography>
                      <LineChart
                        dataset={dataset}
                        xAxis={[{ dataKey: "x" }]}
                        series={[{ dataKey: "y" }]}
                        width={500}
                        height={300}
                        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        grid={{ vertical: true, horizontal: true }}
                      />
                    </Typography>
                  </CardBody>
                </Card>
              </div>
              <div>
                {" "}
                <Card className="mt-6 w-96 ml-4">
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Statistik
                    </Typography>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "Materi" },
                            { id: 1, value: 15, label: "Latihan" },
                            { id: 2, value: 20, label: "Penilaian" },
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
  );
};

export default Dashboard;
