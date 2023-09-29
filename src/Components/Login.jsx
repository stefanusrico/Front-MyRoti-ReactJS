import React from "react"
import { useState } from "react"
import "../Styles/Login.css"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="overflow-hidden rounded-2xl">
      <section className="bg-[#FEEBB2]-50 min-h-screen flex items-center justify-center">
        <div className="bg-[#FEEBB2]-100 min-h-screen flex justify-center items-center h-screen">
          <div className="md:block hidden w-1/2 h-full relative">
            <img
              src="quaso.jpeg"
              alt=""
              className=" h-full w-full object-cover"
            />
          </div>

          <div className="bg-gray-100 flex max-w-3xl p-5 items-center rounded-2xl shadow-lg">
            <div className="md:w-1/2 px-8 flex mx-auto">
              <div className="flex flex-col items-center justify-center h-screen">
                <img src="https://i.imgur.com/MmbNAQd.png" alt="logomyroti" />
                <h2 className="font-bold text-2xl mt-4">Welcome to My Roti!</h2>
                <form
                  action=""
                  className="flex flex-col items-center mt-4 space-y-4"
                >
                  <div className="w-full max-w-md">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="text"
                      id="username"
                      placeholder="Username"
                      autoComplete="none"
                    />
                  </div>
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <input
                        className="p-2 rounded-xl border w-full pr-10"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                      />
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>
                  </div>
                  <button className="bg-[#002D74] rounded-xl text-white py-2 px-5 w-full hover:scale-110 duration-300">
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
