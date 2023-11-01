import NavKoor from "./NavKoor"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
// import LogoRoti from "../assets/LogoRoti.png"

function LapakDistribusi() {
  const navigateTo = useNavigate()
  const [lapak, setLapak] = useState([])
  const [kurirTerpilih, setKurirTerpilih] = useState(null) // Simpan informasi kurir terpilih di sini

  const ambilDataLapak = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/lapak")
      const dataLapak = response.data
      setLapak(dataLapak)
    } catch (error) {
      console.error("Error mengambil data:", error)
    }
  }

  const ambilDataKurir = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/kurir-by-area"
      )
      const kurirData = response.data
      setKurir(kurirData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlePilihKurir = (lapak) => {
    setKurirTerpilih(lapak)
  }

  const tampilkanKurirDalamAreaSama = (lapak, semuaKurir) => {
    if (!lapak || !lapak.area || !semuaKurir) {
      return []
    }

    // Filter kurir berdasarkan area yang sama dengan lapak yang dipilih
    const kurirDalamArea = semuaKurir.filter(
      (kurir) => kurir.area === lapak.area
    )
    return kurirDalamArea
  }

  const [kurir, setKurir] = useState([]) // Simpan daftar kurir
  useEffect(() => {
    ambilDataLapak() // Ambil data lapak
    ambilDataKurir() // Ambil data kurir (pastikan Anda mengimplementasikannya)
  }, [])
  return (
    <>
      <NavKoor />
      <div className="p-20 sm:ml-64 scroll">
        <div className="p-10 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          {lapak.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
              {lapak.map((lapak, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="p-8 rounded-t-lg object-cover h-60 w-96"
                    src={lapak.image}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {lapak.nama_lapak}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {lapak.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {lapak.alamat_lapak}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {lapak.contact_lapak}
                      </span>
                    </div>
                    <div className="flex items-center justify-center mt-3">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-8 rounded-full"
                        onClick={() => {
                          handlePilihKurir(lapak)
                          navigateTo(`/koordinator/pilih-kurir/${lapak.id}`)
                        }}
                      >
                        Kirim Produk
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Data tidak tersedia atau sedang dimuat...</p>
          )}
        </div>
      </div>
      <div className="p-20 sm:ml-64 scroll">
        <div className="p-10 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          {kurirTerpilih && kurir.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
              {tampilkanKurirDalamAreaSama(kurirTerpilih, kurir).map(
                (kurir, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    {/* Tampilkan informasi kurir di sini */}
                  </div>
                )
              )}
            </div>
          ) : (
            <p>Tidak ada kurir dalam area yang sama dengan lapak terpilih.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default LapakDistribusi
