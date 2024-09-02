import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import MateriList from "./pages/Materi";
import TugasList from "./pages/Tugas";
import MateriMahasiswa from "./pages/Mahasiswa/MahasiswaMateri"
import Canvas from "./pages/Canvas";
import Profil from "./pages/Profil";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/materi" element={<MateriList />} />
          <Route path="/tugas" element={<TugasList />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/profil" element={<Profil />} />

          {/* Mahasiswa Route */}
          <Route path="/mahasiswa/materi" element={<MateriMahasiswa />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
