import React from "react"
import { useState } from "react"
import axios from "axios"

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
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
        // Handle success, e.g., redirect to a success page
      })
      .catch((error) => {
        console.error(error.response.data)
        // Handle errors, e.g., display validation errors to the user
      })
  }

  return (
    <body className="bg-krem h-screen">
      <div className="p-16">
        <div className="rounded-lg border-black">
          <div className="bg-coklat border-2 border-black rounded-lg">
            <div className="text-center font-bold text-2xl p-5">
              REGISTRATION
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="text-center text-l p-8">
                <p>Masukan Username</p>
                <input
                  className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                  type="text"
                  id="inputBox"
                  name="username"
                  placeholder="Username"
                  autoComplete="none"
                  value={formData.username}
                  onChange={handleChange}
                ></input>
              </div>

              <div className="text-center text-l p-8">
                <p>Masukan Password</p>
                <input
                  className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                  type="password"
                  id="inputBox"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="none"
                ></input>
              </div>

              <div className="text-center text-m p-8">
                <p>Masukan Ulang Password</p>
                <input
                  className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  id="inputBox"
                  placeholder="Password"
                  autoComplete="none"
                ></input>
              </div>

              <div className="flex justify-center p-6">
                <button className=" bg-krem border-2 border-black text-black rounded-xl py-2 px-5 hover:scale-90 duration-300 font-bold w-48">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Registration
