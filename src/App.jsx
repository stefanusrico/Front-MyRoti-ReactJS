import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Registration from "./Components/Registration"
import NavKoor from "./Components/NavKoor"
import KoordinatorLapak from "./Components/Koordinator/KoordinatorLapak.jsx"
import LapakDistribusi from "./Components/LapakDistribusi"
import KurirDistribusi from "./Components/KurirDistribusi"
import DataKurir from "./Components/Admin/DataKurir.jsx"
import DataKoordinator from "./Components/Admin/DataKoordinator.jsx"
import DataKeuangan from "./Components/Admin/DataKeuangan.jsx"
import Distribusi from "./Components/Koordinator/distribusiKurir.jsx"
import EditDistribusi from "./Components/Koordinator/editDistribusi.jsx"
import PilihLapak from "./Components/Koordinator/pilihLapak.jsx"
import KoordinatorProduct from "./Components/Koordinator/KoordinatorProduk.jsx"
import KoordinatorProductFormAdd from "./Components/Koordinator/KoordinatorProductFormAdd.jsx"
import KoordinatorProductFormEdit from "./Components/Koordinator/KoordinatorProductFormEdit.jsx"
import DashboardAdmin from "./Components/Admin/DashboardAdmin.jsx"
import KoordinatorLapakFormAdd from "./Components/Koordinator/KoordinatorLapakFormAdd.jsx"
import KoordinatorLapakFormEdit from "./Components/Koordinator/KoordinatorLapakFormEdit.jsx"
import EditKurir from "./Components/Admin/EditKurir.jsx"
import EditKoordinator from "./Components/Admin/EditKoordinator.jsx"
import EditKeuangan from "./Components/Admin/EditKeuangan.jsx"
import NavKurir from "./Components/NavKurir"
import KurirPengiriman from "./Components/Kurir/KurirPengiriman.jsx"
import KurirRekapPengiriman from "./Components/KurirRekapPengiriman.jsx"

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/admin/register" element={<Registration />} />
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
      <Route path="/koordinator/tambah-roti" element={<KoordinatorProductFormAdd />} />
      <Route path="/koordinator/edit-roti/:id" element={<KoordinatorProductFormEdit />} />
      {/* Admin */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/data-kurir" element={<DataKurir />} />
      <Route path="/admin/data-koordinator" element={<DataKoordinator />} />
      <Route path="/admin/data-keuangan" element={<DataKeuangan />} />
      <Route path="/edit-kurir/:id" element={<EditKurir />} />
      <Route path="/edit-koordinator/:id" element={<EditKoordinator />} />
      <Route path="/edit-keuangan/:id" element={<EditKeuangan />} />
      {/* koordinator distribusi */}
      <Route path="/koordinator/post" element={<Distribusi />} />
      <Route
        path="/edit-distribusi/:idKurir/:idLapak"
        element={<EditDistribusi />}
      />
      <Route path="/pilih-lapak/:id" element={<PilihLapak />} />
      <Route path="/kurir/:id/pengiriman" element={<KurirPengiriman />} />
    </Routes>
  )
}

export default App
