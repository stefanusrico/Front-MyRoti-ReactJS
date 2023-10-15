import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Registration from "./Components/Registration"
import NavKoor from "./Components/NavKoor"
import KoordinatorLapak from "./Components/KoordinatorLapak"
import LapakDistribusi from "./Components/LapakDistribusi"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/navbar" element={<NavKoor />} />
      <Route path="/koordinator/pilih-lapak" element={<LapakDistribusi />} />
      <Route path="/koordinator/product" element={<KoordinatorLapak />} />
    </Routes>
  )
}

export default App
