import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../Styles/Login.css"
import axios from "axios"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        username: username,
        password: password,
      })
      console.log(response)

      if (response.data.success) {
        const role = response.data.role // Mengambil role pengguna
        setUsername("")
        setPassword("")
        setError("")

        if (role === "Koordinator") {
          navigate("/koordinator/lapak")
        } else if (role === "Kurir") {
          navigate("/kurir")
        } else if (role === "Keuangan") {
          navigate("/keuangan")
        } else if (role === "Admin") {
          navigate("/admin/dashboard")
        }
      } else {
        if (response.status === 400) {
          console.log("test gaming error")
          setError("Invalid username or password.")
        } else {
          setError(response.data.message || "An error occurred during login.")
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid username or password.")
      } else {
        console.error("Terjadi kesalahan:", error)
        setError("An error occurred while processing your request.")
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className="overflow-hidden rounded-2xl">
      <section className="bg-krem min-h-screen flex items-center justify-center">
        <div className="min-h-screen flex justify-center items-center h-screen">
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
                <h2 className="font-bold text-2xl mt-4 text-center">
                  Welcome to My Roti!
                </h2>
                <form
                  action=""
                  className="flex flex-col items-center mt-4 space-y-4"
                  onSubmit={handleLogin}
                >
                  <div className="w-full max-w-md">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="text"
                      id="username"
                      placeholder="Username"
                      autoComplete="none"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <input
                        className="p-2 rounded-xl border w-full pr-10"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700`}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>
                  </div>
                  {error && <div className="text-red-500 mt-2">{error}</div>}
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
