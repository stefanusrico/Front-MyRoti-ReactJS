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

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      {/* Navbar */}
      <Route path="/navbar" element={<NavKoor />} />
      {/* Koordinator */}
      <Route path="/koordinator/distribusi" element={<LapakDistribusi />} />
      <Route
        path="/koordinator/pilih-kurir/:id"
        element={<KurirDistribusi />}
      />
      <Route path="/koordinator/lapak" element={<KoordinatorLapak />} />
      {/* Admin */}
      <Route path="/admin/data-kurir" element={<DataKurir />} />
      <Route path="/admin/data-koordinator" element={<DataKoordinator />} />
      <Route path="/admin/data-keuangan" element={<DataKeuangan />} />
    </Routes>
  )
}

export default App
