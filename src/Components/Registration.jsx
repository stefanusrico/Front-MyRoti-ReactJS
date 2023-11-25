import { useState } from "react"
import axios from "axios"
import NavAdmin from "./NavbarAdmin"

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    id_role: "",
    id_area: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const roleOptions = [
    { type: "disabled", label: "Pilih Peran", value: "" }, // Menambahkan opsi default
    { label: "Admin", value: 2 },
    { label: "Koordinator", value: 3 },
    { label: "Kurir", value: 1 },
    { label: "Keuangan", value: 4 },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        id_role: formData.id_role,
        id_area: formData.id_area || null,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
  }

  return (
    <>
      <NavAdmin />
      <div className="bg-coklat md:mt-16 md:ml-64 md:p-10">
        <div className="flex justify-center font-bold text-2xl p-5">
          REGISTRATION
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="text-center text-l p-4 md:p-4">
            <p>Pilih Peran</p>
            <select
              className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning"
              id="id_role"
              name="id_role"
              value={formData.id_role}
              onChange={handleChange}
            >
              {roleOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.value === ""}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.id_role == 1 && ( // Menampilkan input area_id hanya saat role adalah "Kurir"
            <div className="text-center text-l p-4 md:p-1">
              <p>Masukkan Area ID</p>
              <input
                className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
                type="text"
                id="id_area"
                name="id_area"
                placeholder="Area ID"
                value={formData.id_area}
                onChange={handleChange}
                autoComplete="none"
              />
            </div>
          )}

          <div className="text-center text-l p-4 md:p-1">
            <p>Masukkan Nama</p>
            <input
              className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
              type="text"
              id="name"
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              autoComplete="none"
            />
          </div>

          <div className="text-center text-l p-4 md:p-1">
            <p>Masukkan Email</p>
            <input
              className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="none"
            />
          </div>

          <div className="text-center text-l p-4 md:p-1">
            <p>Masukkan Password</p>
            <input
              className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="none"
            />
          </div>

          <div className="text-center text-m p-4 md:p-1">
            <p>Masukkan Ulang Password</p>
            <input
              className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              autoComplete="none"
            />
          </div>

          <div className="flex justify-center p-4 md:p-6">
            <button className="bg-krem border-2 border-black rounded-xl py-2 px-5 hover:scale-90 duration-300 font-bold w-full md:w-48">
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Registration
