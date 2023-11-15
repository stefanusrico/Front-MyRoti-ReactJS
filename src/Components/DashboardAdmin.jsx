import { useEffect, useState } from "react"
import axios from "axios"
import NavAdmin from "./NavbarAdmin"

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
        <div className="grid grid-cols-4 gap-4 m-6">
          <DashboardCard
            icon="person-outline"
            color="bg-blue-400"
            title="User"
            amount={amountUser}
            viewDetailsUrl="http://instagram.com/cozr17"
          />
          <DashboardCard
            icon="bicycle-outline"
            color="bg-green-400"
            title="Kurir"
            amount={amountKurir}
            viewDetailsUrl="/admin/data-kurir"
          />
          <DashboardCard
            icon="desktop-outline"
            color="bg-yellow-300"
            title="Koordinator"
            amount={amountKoordinator}
            viewDetailsUrl="/admin/data-koordinator"
          />
          <DashboardCard
            icon="cash-outline"
            color="bg-red-400"
            title="Keuangan"
            amount={amountKeuangan}
            viewDetailsUrl="/admin/data-keuangan"
          />
        </div>
      </div>
    </>
  )
}

const DashboardCard = ({ icon, color, title, amount, viewDetailsUrl }) => (
  <div
    className={`border border-gray-400 ${color} p-1 flex flex-col justify-between`}
  >
    <div className="text-center">
      <div className="text-7xl">
        <ion-icon name={icon}></ion-icon>
      </div>
      <p className="text-2xl font-bold">
        {amount !== null ? amount : "Loading..."}
      </p>
      <span className="text-l">{title}</span>
    </div>
    <a href={viewDetailsUrl} className="text-center border-2 bg-gray-300">
      view details <ion-icon name="arrow-forward-outline"></ion-icon>
    </a>
  </div>
)

export default DashboardAdmin
