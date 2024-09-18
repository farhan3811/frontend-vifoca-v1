import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import MateriList from "./pages/Materi";
import TugasList from "./pages/Tugas";
import MateriMahasiswa from "./pages/Mahasiswa/MahasiswaMateri"
import TugasMahasiswa from "./pages/Mahasiswa/MahasiswaTugas"
import Canvas from "./pages/Canvas";
import Profil from "./pages/Profil";
import Penilaian from "./pages/PenilaianDosen";
import KonfirmasiMahasiswa from "./pages/KonfirmasiMahasiswa";
import PenilaianMahasiswa from "./pages/Mahasiswa/MahasiswaPenilaian";
import PenilaianMahasiswas from "./pages/Penilaian";
import PenilaianSoal from "./pages/PenilaianMahasiswa";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/materi" element={<MateriList />} />
          <Route path="/latihan" element={<TugasList />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/penilaian" element={<Penilaian />} />
          <Route path="/konfirmasi" element={<KonfirmasiMahasiswa />} />

          {/* Mahasiswa Route */}
          <Route path="/mahasiswa/materi" element={<MateriMahasiswa />} />
          <Route path="/mahasiswa/tugas/:materi_id" element={<TugasMahasiswa />} />
          <Route path="/tugas/:id_tugas" element={<Canvas />} />
          <Route path="/mahasiswa/penilaian" element={<PenilaianMahasiswa />} />
          <Route path="/mahasiswa/penilaians" element={<PenilaianMahasiswas />} />
          <Route path="/penilaian/:penilaianId" element={<PenilaianSoal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
