import React, { useState } from "react"
import axios from "axios"
import NavKoor from "./NavKoor"

function KoordinatorProductFormAdd() {
  const [formData, setFormData] = useState({
    image: null,
    nama_roti: "",
    jenis_roti: "",
    tanggal_produksi: "",
    tanggal_kadaluarsa: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
  }

  const addData = async () => {
    try {
      const data = new FormData()
      data.append("image", formData.image)
      data.append("nama_roti", formData.nama_roti)
      data.append("jenis_roti", formData.jenis_roti)
      data.append("tanggal_produksi", formData.tanggal_produksi)
      data.append("tanggal_kadaluarsa", formData.tanggal_kadaluarsa)

      const response = await axios.post(
        "http://127.0.0.1:8000/api/roti",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log("Data berhasil ditambahkan:", response.data)
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

      console.error("Error adding data:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addData()

    window.location.href = "http://localhost:5173/koordinator/product"
  }

  return (
    <>
      <NavKoor />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-60 md:mt-10 scroll max-h-[100vh] overflow-y-auto">
        <div className="p-8 border-2 bg-white border-gray-300 rounded-lg dark:border-gray-700">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Tambah Product</h1>
          </div>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label
                  className="block text-sm font-bold text-gray-600 mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
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
                  onChange={handleInputChange}
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
                  Tambah
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default KoordinatorProductFormAdd
