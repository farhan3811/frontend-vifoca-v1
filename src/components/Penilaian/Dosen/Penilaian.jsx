import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option
} from "@material-tailwind/react";
import Tugas from "../../Penilaian/Dosen/BeforePenilaian";
import Materi from "../../Penilaian/Dosen/HistoriPenilaian";
import DefaultPagination from "../../Pagination/Pagination";
import Breadcumbs from "../Dosen/Breadcumbs";

const Userlist = () => {
  const [activeTab, setActiveTab] = useState("tugas");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const data = [
    { label: "Penilaian", value: "tugas" },
    { label: "Histori Penilaian", value: "materi" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="container px-20 mt-10">
      <Breadcumbs />
      <Card className="w-full h-full p-6 mb-6">
        <Tabs value={activeTab}>
          <TabsHeader className="w-96 font-title font-medium bg-white" indicatorProps={{ className: "bg-blue shadow-none rounded" }}>
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className={`border-2 rounded ml-2 transition-colors ${
                  activeTab === value ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                } px-4 py-2`}
                onClick={() => setActiveTab(value)}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <div className="flex flex-wrap gap-2 ml-4 my-2">
            <div className="w-50 rounded">
              <Select
                className="border-gray-300 rounded"
                value={sortOrder}
                onChange={(value) => setSortOrder(value)}
              >
                <Option value="desc">Terbaru</Option>
                <Option value="asc">Terlama</Option>
              </Select>
            </div>
            <div className="w-full md:w-72">
              <label className="input input-bordered border-gray-300 bg-white h-10 flex items-center gap-2">
                <input
                  type="text"
                  className="grow bg-white"
                  placeholder="Cari"
                  value={search}
                  onChange={handleSearchChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <TabsBody>
            <TabPanel key="tugas" value="tugas">
              <Tugas />
            </TabPanel>
            <TabPanel key="materi" value="materi">
              <Materi />
            </TabPanel>
          </TabsBody>
        </Tabs>
        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default Userlist;
