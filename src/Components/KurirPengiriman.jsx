import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import NavKurir from "./NavKurir"

function KurirPengiriman() {
  const { id } = useParams()
  const [lapakData, setLapakData] = useState(null)

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tampil-lapak/${id}`
      )

      const dataAlokasi = response.data
      console.log(response.data)
      setLapakData(dataAlokasi)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const updateKeterangan = async (idAlokasi) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}/update-keterangan`
      )
      console.log(response.data)
      window.location.reload() // Perbarui halaman setelah berhasil mengupdate
    } catch (error) {
      console.error("Error updating data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  return (
    <>
      <NavKurir />
      <div className="md:mt-4 bg-gray-100 text-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
              {lapakData &&
                lapakData.map((lapak, index) => (
                  <div
                    key={index}
                    className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row mb-4"
                  >
                    <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                      <img
                        src={lapak.image_url}
                        alt={`card-image-${index}`}
                        className="object-cover h-60 w-96"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between w-2/5">
                      <div>
                        <div className="mb-2">
                          <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {lapak.nama_lapak}
                          </h4>
                          <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                            {lapak.alamat}
                          </p>
                          <p className="mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                            Nama Roti: {lapak.nama_roti}
                          </p>
                          <p className="mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                            Jumlah Roti Alokasi: {lapak.jumlah_roti_alokasi}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-2/5 m-5 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                      <div className="mb-5">
                        <p className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                          Nama Roti: {lapak.nama_roti}
                        </p>
                        <p className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                          Jumlah Roti Alokasi: {lapak.jumlah_roti_alokasi}
                        </p>
                      </div>
                    </div>
                    <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                      <div className="text-right">
                        <a href="#" className="inline-block">
                          <button
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                            type="button"
                            onClick={() => updateKeterangan(lapak.id_alokasi)}
                          >
                            Learn More
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default KurirPengiriman
