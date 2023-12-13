import { useParams } from "react-router-dom"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import NavAdmin from "../NavbarAdmin"
import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"

function EditKoordinator() {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: "",
    password_unhashed: "",
  })

  const [prevFormData, setPrevFormData] = useState({
    name: "",
    password_unhashed: "",
  })

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/data-koordinator/${id}`
        )
        const koordinatorData = response.data

        console.log("Data dari API:", koordinatorData)

        // Set nilai awal state formData dan prevFormData
        setFormData({
          name: koordinatorData[0].name,
          password_unhashed: koordinatorData[0].password_unhashed,
        })
        setPrevFormData({
          name: koordinatorData[0].name,
          password_unhashed: koordinatorData[0].password_unhashed,
        })

        console.log("Data setelah diatur:", formData)
      } catch (error) {
        setError("Error fetching data")
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [id])

  console.log("Render, Data di dalam state formData:", formData)

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
        `http://127.0.0.1:8000/api/update-koordinator/${id}`,
        formData
      )

      if (formData.password_unhashed !== prevFormData.password_unhashed) {
        // Jika password baru dimasukkan, perbarui password pengguna (User)
        const passwordResponse = await axios.put(
          `http://127.0.0.1:8000/api/update-koordinator-password/${id}`,
          { password_unhashed: formData.password_unhashed }
        )
        console.log("Password Updated:", passwordResponse.data)
      }

      console.log("Response from API:", response.data)
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer)
          toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
      })

      Toast.fire({
        icon: "success",
        title: "Update successful",
        background: "#4CAF50",
      })
    } catch (error) {
      setError("Error updating data")
      console.error("Error updating data:", error)

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer)
          toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
      })

      Toast.fire({
        icon: "error",
        title: "Error updating data",
        text: error.message,
        background: "#FF5252",
      })
    }
  }

  return (
    <>
      <NavAdmin />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto flex items-center justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Edit Koordinator
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Edit Koordinator data below:
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 h-full max-h-screen">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                name="name"
                value={formData.name}
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
                    name="password_unhashed"
                    value={formData.password_unhashed}
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

export default EditKoordinator
