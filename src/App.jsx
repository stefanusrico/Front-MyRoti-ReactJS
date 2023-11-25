import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Registration from "./Components/Registration"
import NavKoor from "./Components/NavKoor"
import KoordinatorLapak from "./Components/KoordinatorLapak"
import LapakDistribusi from "./Components/LapakDistribusi"
import KurirDistribusi from "./Components/KurirDistribusi"
import DataKurir from "./Components/DataKurir"
import DataKoordinator from "./Components/DataKoordinator"
import DataKeuangan from "./Components/DataKeuangan"
import Distribusi from "./Components/distribusiKurir"
import EditDistribusi from "./Components/editDistribusi"
import PilihLapak from "./Components/pilihLapak"
import KoordinatorProduct from "./Components/KoordinatorProduk"
import DashboardAdmin from "./Components/DashboardAdmin"
import KoordinatorLapakFormAdd from "./Components/KoordinatorLapakFormAdd.jsx"
import KoordinatorLapakFormEdit from "./Components/KoordinatorLapakFormEdit.jsx"
import EditKurir from "./Components/EditKurir"
import NavKurir from "./Components/NavKurir"
import KurirPengiriman from "./Components/KurirPengiriman"
import KurirRekapPengiriman from "./Components/KurirRekapPengiriman.jsx"

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      {/* Navbar */}
      <Route path="/navbar" element={<NavKoor />} />
      <Route path="/navkurir" element={<NavKurir />} />
      {/* Koordinator */}
      <Route path="/koordinator/distribusi" element={<LapakDistribusi />} />
      <Route
        path="/koordinator/pilih-kurir/:id"
        element={<KurirDistribusi />}
      />
      <Route path="/koordinator/lapak" element={<KoordinatorLapak />} />
      <Route
        path="/koordinator/tambah-lapak"
        element={<KoordinatorLapakFormAdd />}
      />
      <Route
        path="/koordinator/edit-lapak/:id"
        element={<KoordinatorLapakFormEdit />}
      />
      <Route path="/koordinator/product" element={<KoordinatorProduct />} />
      {/* Admin */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/data-kurir" element={<DataKurir />} />
      <Route path="/admin/data-koordinator" element={<DataKoordinator />} />
      <Route path="/admin/data-keuangan" element={<DataKeuangan />} />
      {/* koordinator distribusi */}
      <Route path="/post" element={<Distribusi />} />
      <Route
        path="/edit-distribusi/:idKurir/:idLapak"
        element={<EditDistribusi />}
      />
      <Route path="/pilih-lapak/:id" element={<PilihLapak />} />
    </Routes>
  )
}

export default App
