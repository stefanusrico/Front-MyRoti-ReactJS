import { useParams } from "react-router-dom"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react"
import NavAdmin from "./NavbarAdmin"
import React, { useState, useEffect } from "react"
import axios from "axios"

function EditKurir() {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    nama_kurir: "",
    password: "",
    area_id: "",
  })

  const [prevFormData, setPrevFormData] = useState({
    nama_kurir: "",
    area_id: "",
  })

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/data-kurir/${id}`
        )
        const kurirData = response.data

        setPrevFormData({ ...formData })

        setFormData({
          nama_kurir: kurirData.nama_kurir,
          area_id: kurirData.area_id,
        })
      } catch (error) {
        setError("Error fetching data")
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleUpdate = async () => {
    console.log("Data Sebelum Pembaruan:", prevFormData) // Data sebelum pembaruan
    console.log("Data Setelah Pembaruan:", formData) // Data yang akan dikirim ke API

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-kurir/${id}`,
        formData
      )

      if (formData.password !== prevFormData.password) {
        // Jika password baru dimasukkan, perbarui password pengguna (User)
        const passwordResponse = await axios.put(
          `http://127.0.0.1:8000/api/update-user-password/${id}`,
          { password: formData.password }
        )
        console.log("Password Updated:", passwordResponse.data)
      }

      console.log("Response from API:", response.data)
      // Setelah berhasil perubahan, Anda dapat melakukan navigasi atau tindakan lain sesuai kebutuhan
    } catch (error) {
      setError("Error updating data")
      console.error("Error updating data:", error)
    }
  }

  return (
    <>
      <NavAdmin />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Edit Kurir
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Edit kurir data below:
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                name="nama_kurir"
                value={formData.nama_kurir}
                onChange={handleChange}
                placeholder="Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Area ID
              </Typography>
              <Input
                size="lg"
                name="area_id"
                value={formData.area_id}
                onChange={handleChange}
                placeholder="Area ID"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              className="bg-red-500 mt-6"
              onClick={handleUpdate}
              fullWidth
            >
              Update
            </Button>
            {error && (
              <Typography color="red" className="mt-2">
                {error}
              </Typography>
            )}
          </form>
        </Card>
      </div>
    </>
  )
}

export default EditKurir
