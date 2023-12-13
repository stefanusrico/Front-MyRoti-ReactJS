import React, { useState, useEffect } from "react"
import axios from "axios"
import NavKoor from "../NavKoor"
import { useParams } from "react-router-dom"

function KoordinatorLapakFormEdit() {
  const { id } = useParams()
  const lapakId = id

  const [formData, setFormData] = useState({
    nama_lapak: "",
    id_area: "",
    alamat: "",
    contact_lapak: "",
    id_kurir: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/lapak/${lapakId}`
        )
        const lapakData = response.data

        setFormData({
          nama_lapak: lapakData.nama_lapak,
          id_area: lapakData.id_area,
          alamat: lapakData.alamat,
          contact_lapak: lapakData.contact_lapak,
          id_kurir: lapakData.id_kurir,
        })
      } catch (error) {
        console.error("Error fetching lapak data:", error)
      }
    }

    fetchData()
  }, [lapakId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-lapak/${lapakId}`,
        {
          id_area: formData.id_area,
          alamat: formData.alamat,
          contact_lapak: formData.contact_lapak,
          id_kurir: formData.id_kurir,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Data berhasil diupdate:", response.data)
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
        console.error("Response headers:", error.response.headers)
      } else if (error.request) {
        console.error("No response received:", error.request)
      } else {
        console.error("Error setting up the request:", error.message)
      }

      console.error("Error updating data:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateData()
    window.location.href = "http://localhost:5173/koordinator/lapak"
  }

  return (
    <>
      <NavKoor />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-60 md:mt-10 scroll max-h-[100vh] overflow-y-auto">
        <div className="p-8 border-2 bg-white border-gray-300 rounded-lg dark:border-gray-700">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Edit Lapak</h1>
          </div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="nama_lapak"
                >
                  Nama Lapak
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nama_lapak"
                  type="text"
                  placeholder="Nama Lapak"
                  name="nama_lapak"
                  value={formData.nama_lapak}
                  // onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="contact_lapak"
                >
                  Contact Lapak
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="contact_lapak"
                  type="text"
                  placeholder="Contact Lapak"
                  name="contact_lapak"
                  value={formData.contact_lapak}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="alamat"
                >
                  Alamat
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="alamat"
                  type="text"
                  placeholder="Alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="id_area"
                >
                  Area ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="id_area"
                  type="text"
                  placeholder="Area ID"
                  name="id_area"
                  value={formData.id_area}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="id_kurir"
                >
                  Kurir ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="id_kurir"
                  type="text"
                  placeholder="Kurir ID"
                  name="id_kurir"
                  value={formData.id_kurir}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default KoordinatorLapakFormEdit
