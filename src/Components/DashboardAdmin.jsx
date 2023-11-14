import { useEffect, useState } from "react"
import NavAdmin from "./NavbarAdmin"
import axios from "axios"

function DashboardAdmin() {
  const [amountKoordinator, setAmountKoordinator] = useState(null)
  const [amountUser, setAmountUser] = useState(null)
  const [amountKurir, setAmountKurir] = useState(null)
  const [amountKeuangan, setAmountKeuangan] = useState(null)

  const getAmountKoordinator = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-amount-koordinator"
      )
      const data = response.data
      setAmountKoordinator(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const getAmountUser = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-amount-user"
      )
      const data = response.data
      setAmountUser(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const getAmountKurir = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-amount-kurir"
      )
      const data = response.data
      setAmountKurir(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const getAmountKeuangan = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-amount-keuangan"
      )
      const data = response.data
      setAmountKeuangan(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getAmountKoordinator()
    getAmountUser()
    getAmountKurir()
    getAmountKeuangan()
  }, [])

  return (
    <>
      <NavAdmin />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto">
        <h1>
          Jumlah User saat ini:{" "}
          {amountUser !== null ? amountUser : "Loading..."}
        </h1>
        <h1>
          Jumlah Koordinator saat ini:{" "}
          {amountKoordinator !== null ? amountKoordinator : "Loading..."}
        </h1>
        <h1>
          Jumlah Kurir saat ini:{" "}
          {amountKurir !== null ? amountKurir : "Loading..."}
        </h1>
        <h1>
          Jumlah Keuangan saat ini:{" "}
          {amountKeuangan !== null ? amountKeuangan : "Loading..."}
        </h1>
      </div>
    </>
  )
}

export default DashboardAdmin
