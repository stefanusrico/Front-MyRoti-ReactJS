import { useEffect, useState } from "react"
import { BsGraphUp } from "react-icons/bs"
import axios from "axios"
import { Link } from "react-router-dom"
import NavKeuangan from "./NavbarKeuangan"

function DashboardKeuangan() {
  const [amountHarian, setAmountHarian] = useState(null)
  const [amountBulan, setAmountBulan] = useState(null)
  const [amountTahun, setAmountTahun] = useState(null)

  const fetchData = async (apiEndpoint, setData) => {
    try {
      const response = await axios.get(apiEndpoint)
      setData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error.message)
      // Tindakan yang sesuai, seperti menampilkan pesan kesalahan kepada pengguna
    }
  }

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/api/pemasukan-harian", setAmountHarian)
    fetchData("http://127.0.0.1:8000/api/pemasukan-bulan", setAmountBulan)
    fetchData("http://127.0.0.1:8000/api/pemasukan-tahun", setAmountTahun)
  }, [])

  return (
    <>
      <NavKeuangan />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto">
        <div className="grid grid-cols-3 gap-6 m-4">
          <DashboardCard
            icon={<BsGraphUp size={50} />}
            color="bg-yellow-300"
            title="Pemasukan Hari Ini"
            amount={amountHarian}
            viewDetailsUrl="/admin/data-koordinator"
          />
          <DashboardCard
            icon={<BsGraphUp size={50} />}
            color="bg-coklat"
            title="Pemasukan Bulan Ini"
            amount={amountBulan}
            viewDetailsUrl="/admin/data-kurir"
          />
          <DashboardCard
            icon={<BsGraphUp size={50} />}
            color="bg-Sienna"
            title="Pemasukan Tahun Ini"
            amount={amountTahun}
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
    <div className="text-center flex items-center justify-center h-full">
      <div className="text-7xl">{icon}</div>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold">{amount ?? "Loading..."}</p>
      <span className="text-l">{title}</span>
    </div>
    <Link to={viewDetailsUrl} className={`text-center text-white ${color}`}>
      More Info <ion-icon name="arrow-forward-outline"></ion-icon>
    </Link>
  </div>
)

export default DashboardKeuangan
