import { useState } from "react"
import axios from "axios"

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
    role: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://127.0.0.1:8000/api/registrasi", formData)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
  }

  return (
    <div className="bg-krem min-h-screen flex items-center justify-center">
      <div className="p-4 md:p-8 lg:p-16 w-full md:w-3/4 lg:w-2/4">
        <div className="rounded-lg border-black">
          <div className="bg-coklat border-2 border-black rounded-lg">
            <div className="text-center font-bold text-2xl p-5">
              REGISTRATION
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="text-center text-l p-4 md:p-4">
                <p>Pilih Peran</p>
                <select
                  className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning"
                  id="roleSelect"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Koordinator">Koordinator</option>
                  <option value="Kurir">Kurir</option>
                  <option value="Keuangan">Keuangan</option>
                </select>
              </div>

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
                <p>Masukkan Username</p>
                <input
                  className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
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
                <button className="bg-krem border-2 border-black text-black rounded-xl py-2 px-5 hover:scale-90 duration-300 font-bold w-full md:w-48">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
