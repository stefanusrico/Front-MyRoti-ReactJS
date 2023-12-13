import React, { useState, useEffect } from "react"
import axios from "axios"
import NavKoor from "../NavKoor"
import { useParams } from "react-router-dom"

function KoordinatorProductFormEdit() {
  const { id } = useParams()
  const rotiId = id

  const [formData, setFormData] = useState({
    nama_roti: "",
    jenis_roti: "",
    tanggal_produksi: "",
    tanggal_kadaluarsa: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/roti/${rotiId}`
        )
        const productData = response.data

        setFormData({
            nama_roti: productData.nama_roti,
            jenis_roti: productData.jenis_roti,
            tanggal_produksi: productData.tanggal_produksi,
            tanggal_kadaluarsa: productData.tanggal_kadaluarsa,
        })
      } catch (error) {
        console.error("Error fetching lapak data:", error)
      }
    }

    fetchData()
  }, [rotiId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateData = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-roti/${rotiId}`,
        {
            nama_roti: formData.nama_roti,
            jenis_roti: formData.jenis_roti,
            tanggal_produksi: formData.tanggal_produksi,
            tanggal_kadaluarsa: formData.tanggal_kadaluarsa,
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
    window.location.href = "http://localhost:5173/koordinator/product"
  }

  return (
    <>
      <NavKoor />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-60 md:mt-10 scroll max-h-[100vh] overflow-y-auto">
        <div className="p-8 border-2 bg-white border-gray-300 rounded-lg dark:border-gray-700">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Edit Product</h1>
          </div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="nama_roti"
                >
                  Nama Roti
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="nama_roti"
                  type="text"
                  placeholder="Nama Roti"
                  name="nama_roti"
                  value={formData.nama_roti}
                  // onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="jenis_roti"
                >
                  Jenis Roti
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="jenis_roti"
                  type="text"
                  placeholder="Jenis Roti"
                  name="jenis_roti"
                  value={formData.jenis_roti}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="tanggal_produksi"
                >
                  Tanggal Produksi
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="tanggal_produksi"
                  type="date"
                  placeholder="Tanggal Produksi"
                  name="tanggal_produksi"
                  value={formData.tanggal_produksi}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="tanggal_kadaluarsa"
                >
                  Tanggal Kadaluarsa
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="tanggal_kadaluarsa"
                  type="date"
                  placeholder="Tanggal Kadaluarsa"
                  name="tanggal_kadaluarsa"
                  value={formData.tanggal_kadaluarsa}
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

export default KoordinatorProductFormEdit

