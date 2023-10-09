import React from "react"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Registration from "./Components/Registration"
import NavKoor from "./Components/NavKoor"
import KoordinatorCard from "./Components/KoordinatorCard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/navbar" element={<NavKoor />} />
      <Route path="/koordinator/product" element={<KoordinatorCard />} />
    </Routes>
  )
}

export default App
