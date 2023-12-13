<<<<<<< Updated upstream:src/Components/Kurir/KurirPengiriman.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavKurir from "../NavKurir";
=======
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import NavKurir from "./NavKurir"
>>>>>>> Stashed changes:src/Components/KurirPengiriman.jsx

function KurirPengiriman() {
  const { id } = useParams()
  const [lapakData, setLapakData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formInput, setFormInput] = useState({
    lapak: "",
    id_alokasi: "",
    jumlah_roti_terjual: "",
    // jumlah_roti_tidak_terjual: "",
    pendapatan: "",
    hutang: "",
    catatan: "",
    tanggal_transaksi: "",
  })

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tampil-lapak/${id}`
      )

      const dataAlokasi = response.data
      console.log(dataAlokasi)
      setLapakData(dataAlokasi)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const simpanData = async (idAlokasi, namaLapak) => {
    try {
      setFormInput((prevData) => ({
        ...prevData,
        id_alokasi: idAlokasi,
        lapak: namaLapak,
      }))
      setShowModal(true)
    } catch (error) {
      console.error("Error updating data:", error)
      if (error.response) {
        console.log("Server responded with non-2xx status", error.response.data)
      }
    }
  }

  const updateKeterangan = async (idAlokasi, namaLapak) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}/update-keterangan`
      )
      console.log(response.data)
      setFormInput((prevData) => ({
        ...prevData,
        id_alokasi: idAlokasi,
        lapak: namaLapak,
      }))
      setShowModal(false)
      window.location.reload()
    } catch (error) {
      console.error("Error updating data:", error)
      if (error.response) {
        console.log("Server responded with non-2xx status", error.response.data)
      }
    }
  }

  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormInput((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const submitForm = async () => {
    try {
      if (formInput.catatan !== null && formInput.catatan !== undefined) {
        formInput.catatan = String(formInput.catatan)
      }
      const formData = new FormData()
      formData.append("lapak", formInput.lapak)
      formData.append("id_alokasi", formInput.id_alokasi)
      formData.append("jumlah_roti_terjual", formInput.jumlah_roti_terjual)
      formData.append("pendapatan", formInput.pendapatan)
      formData.append("hutang", formInput.hutang)
      formData.append("catatan", formInput.catatan)
      formData.append("tanggal_transaksi", formInput.tanggal_transaksi)

      const response = await axios.post(
        "http://127.0.0.1:8000/api/transaksi",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log(response.data)
      setShowModal(false)
      updateKeterangan(formInput.id_alokasi, formInput.lapak)
    } catch (error) {
      console.error("Error submitting form:", error)
      if (error.response) {
        console.error(
          "Server responded with non-2xx status",
          error.response.data
        )
      } else if (error.request) {
        console.error("No response received from the server")
      } else {
        console.error("Error setting up the request", error.message)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (lapakData && lapakData.length > 0) {
      setFormInput((prevData) => ({
        ...prevData,
        id_alokasi: lapakData.id_alokasi,
        lapak: lapakData.nama_lapak,
      }))
    }
  }, [lapakData])

  return (
    <>
      <NavKurir />
      <div className="md:mt-4 bg-gray-100 text-gray-900 h-screen overflow-y-auto flex justify-center">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
              <h4 className="mb-5 text-4xl font-mono antialiased font-bold leading-relaxed text-gray-700 h-full flex items-center justify-center text-center">
                Daftar Lapak Yang Perlu Dikirim
              </h4>
              {lapakData &&
                lapakData
                  .filter((lapak) => lapak.keterangan !== "Done")
                  .map((lapak, index) => (
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

                      <div className="relative w-2/5 m-5 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                        <div className="min-h-full">
                          <div className="mb-2">
                            <h4 className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                              Nama Lapak : {lapak.nama_lapak}
                            </h4>
                            <p className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                              Alamat Lapak : {lapak.alamat}
                            </p>
                            <p className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                              Nama Roti : {lapak.nama_roti}
                            </p>
                            <p className="mb-5 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                              Jumlah Roti Alokasi : {lapak.jumlah_roti_alokasi}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex pt-6 pr-2 items-center justify-center h-full text-center flex-col">
                        <a href="#" className="inline-block">
                          <button
                            className="flex items-center justify-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-red-900/10 active:bg-gray-900/20"
                            type="button"
                            onClick={() =>
                              simpanData(lapak.id_alokasi, lapak.nama_lapak)
                            }
                          >
                            Konfirmasi Pengiriman
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-120">
            <h2 className="text-xl font-semibold mb-4">Your Form Title</h2>
            <form className="flex flex-row justify-between">
              <div className="w-1/2 pr-2">
                {/* Left Column */}
                <div className="mb-4">
                  <label
                    htmlFor="id_alokasi"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    ID Alokasi:
                  </label>
                  <input
                    type="number"
                    id="id_alokasi"
                    name="id_alokasi"
                    value={formInput.id_alokasi}
                    onChange={handleFormInputChange}
                    disabled
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lapak"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Lapak:
                  </label>
                  <input
                    type="text"
                    id="lapak"
                    name="lapak"
                    value={formInput.lapak}
                    onChange={handleFormInputChange}
                    disabled
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="jumlah_roti_terjual"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Jumlah Roti Terjual:
                  </label>
                  <input
                    type="number"
                    id="jumlah_roti_terjual"
                    name="jumlah_roti_terjual"
                    value={formInput.jumlah_roti_terjual}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* <div className="mb-4">
                  <label
                    htmlFor="jumlah_roti_tidak_terjual"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Jumlah Roti Tidak Terjual:
                  </label>
                  <input
                    type="number"
                    id="jumlah_roti_tidak_terjual"
                    name="jumlah_roti_tidak_terjual"
                    value={formInput.jumlah_roti_tidak_terjual}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div> */}
              </div>
              <div className="w-1/2 pl-2">
                {/* Right Column */}
                <div className="mb-4">
                  <label
                    htmlFor="pendapatan"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Pendapatan:
                  </label>
                  <input
                    type="number"
                    id="pendapatan"
                    name="pendapatan"
                    value={formInput.pendapatan}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="hutang"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Hutang:
                  </label>
                  <input
                    type="number"
                    id="hutang"
                    name="hutang"
                    value={formInput.hutang}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="catatan"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Catatan:
                  </label>
                  <input
                    type="text"
                    id="catatan"
                    name="catatan"
                    value={formInput.catatan}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tanggal_transaksi"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tanggal Transaksi:
                  </label>
                  <input
                    type="date"
                    id="tanggal_transaksi"
                    name="tanggal_transaksi"
                    value={formInput.tanggal_transaksi}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={submitForm}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default KurirPengiriman
