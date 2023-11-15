import { useParams } from "react-router-dom"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import NavAdmin from "./NavbarAdmin"
import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function EditKeuangan() {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    nama_keuangan: "",
    password: "",
  })

  const [prevFormData, setPrevFormData] = useState({
    nama_keuangan: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/data-keuangan/${id}`
        )
        const keuanganData = response.data
        console.log(keuanganData)

        setPrevFormData({ ...formData })

        setFormData({
          nama_keuangan: keuanganData.nama_keuangan,
          password: keuanganData.password,
        })
      } catch (error) {
        setError("Error fetching data")
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleUpdate = async () => {
    console.log("Data Sebelum Pembaruan:", prevFormData) // Data sebelum pembaruan
    console.log("Data Setelah Pembaruan:", formData) // Data yang akan dikirim ke API

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-keuangan/${id}`,
        formData
      )

      if (formData.password !== prevFormData.password) {
        // Jika password baru dimasukkan, perbarui password pengguna (User)
        const passwordResponse = await axios.put(
          `http://127.0.0.1:8000/api/update-keuangan-password/${id}`,
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
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto flex items-center justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Edit Keuangan
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Edit Keuangan data below:
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 h-full max-h-screen">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                name="nama_keuangan"
                value={formData.nama_keuangan}
                onChange={handleChange}
                placeholder="Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="mb-1 flex flex-col gap-6 relative">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
              </div>
            </div>
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

export default EditKeuangan
