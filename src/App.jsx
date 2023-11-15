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
import KoordinatorProduct from "./Components/KoordinatorProduk"
import DashboardAdmin from "./Components/DashboardAdmin"
import EditKurir from "./Components/EditKurir"
import NavKurir from "./Components/NavKurir"
import KurirPengiriman from "./Components/KurirPengiriman"
import KurirRekapPengiriman from "./Components/KurirRekapPengiriman.jsx"
import EditKoordinator from "./Components/EditKoordinator.jsx"
import EditKeuangan from "./Components/EditKeuangan.jsx"
import KeuanganRekap from "./Components/KeuanganRekap"
import NavKeuangan from "./Components/NavbarKeuangan"

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/admin/register" element={<Registration />} />
      {/* Navbar */}
      <Route path="/navbar" element={<NavKoor />} />
      <Route path="/navkurir" element={<NavKurir />} />
      <Route path="/navbarkeuangan" element={<NavKeuangan />} />
      {/* Koordinator */}
      <Route path="/koordinator/distribusi" element={<LapakDistribusi />} />
      <Route
        path="/koordinator/pilih-kurir/:id"
        element={<KurirDistribusi />}
      />
      <Route path="/koordinator/lapak" element={<KoordinatorLapak />} />
      <Route path="/koordinator/product" element={<KoordinatorProduct />} />
      {/* Admin */}
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/data-kurir" element={<DataKurir />} />
      <Route path="/admin/data-koordinator" element={<DataKoordinator />} />
      <Route path="/admin/data-keuangan" element={<DataKeuangan />} />
      <Route path="/edit-kurir/:id" element={<EditKurir />} />
      <Route path="/edit-koordinator/:id" element={<EditKoordinator />} />
      <Route path="/edit-keuangan/:id" element={<EditKeuangan />} />
      <Route path="/post" element={<Distribusi />} />
      <Route path="/post/edit" element={<EditDistribusi />} />
      {/*Kurir*/}
      <Route path="/kurir/pengiriman" element={<KurirPengiriman />} />
      <Route path="/kurir/rekappengiriman" element={<KurirRekapPengiriman />} />
      {/* Keuangan */}
      <Route path="/keuangan/rekap" element={<KeuanganRekap />} />
    </Routes>
  )
}

export default App
