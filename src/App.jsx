import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Registration from "./Components/Registration"
import NavKoor from "./Components/NavKoor"
import KoordinatorLapak from "./Components/KoordinatorLapak"
import LapakDistribusi from "./Components/LapakDistribusi"
import KurirDistribusi from "./Components/KurirDistribusi"
import DummyData from "./dummydata"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/navbar" element={<NavKoor />} />
      <Route path="/koordinator/distribusi" element={<LapakDistribusi />} />
      <Route
        path="/koordinator/pilih-kurir/:id"
        element={<KurirDistribusi />}
      />
      <Route path="/koordinator/lapak" element={<KoordinatorLapak />} />
      <Route path="/kurir" element={<DummyData />} />
    </Routes>
  )
}

export default App
