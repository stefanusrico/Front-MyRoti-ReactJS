import React, { useState } from "react"
import axios from "axios"
import NavKoor from "../NavKoor"

function KoordinatorLapakFormAdd() {
  const [formData, setFormData] = useState({
    image: null,
    nama_lapak: "",
    id_area: "",
    alamat: "",
    contact_lapak: "",
    id_kurir: "",
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
      data.append("nama_lapak", formData.nama_lapak)
      data.append("id_area", formData.id_area)
      data.append("alamat", formData.alamat)
      data.append("contact_lapak", formData.contact_lapak)
      data.append("id_kurir", formData.id_kurir)

      const response = await axios.post(
        "http://127.0.0.1:8000/api/lapak",
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

    window.location.href = "http://localhost:5173/koordinator/lapak"
  }

  return (
    <>
      <NavKoor />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-60 md:mt-10 scroll max-h-[100vh] overflow-y-auto">
        <div className="p-8 border-2 bg-white border-gray-300 rounded-lg dark:border-gray-700">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Tambah Lapak</h1>
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
                  onChange={handleInputChange}
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

export default KoordinatorLapakFormAdd
