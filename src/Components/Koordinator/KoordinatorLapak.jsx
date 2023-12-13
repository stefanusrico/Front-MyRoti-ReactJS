import NavKoor from "../NavKoor"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@material-tailwind/react"
import { Link } from "react-router-dom"

function KoordinatorLapak() {
  const [cards, setCards] = useState([])

  const redirectAddLapakForm = () => {
    window.location.href = "/koordinator/tambah-lapak"
  }

  // Fungsi untuk mengambil data dari server
  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/lapak")
      setCards(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const deleteData = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/lapak/${id}`
      )
      console.log("Data berhasil dihapus:", response.data)

      getData()
    } catch (error) {
      console.error("Error deleting data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <NavKoor />
      <div className="md:p-20 md:pt-20 md:pb-52 md:ml-60 md:mt-10 scroll max-h-[100vh] overflow-y-auto">
        <div className="p-16 border-2 bg-gray-100 border-gray-400 rounded-lg dark:border-gray-700">
          <div>
            <Button
              onClick={redirectAddLapakForm}
              className="flex flex-row items-center p-3 gap-3 m-4 text-black bg-coklat-kuning border-4 hover-bg-slate-50 focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <ion-icon name="add-circle-outline"></ion-icon>
              <span className="hidden sm:inline">Tambah Lapak</span>
            </Button>
          </div>
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id_lapak}
                  className="w-full max-w-sm bg-white border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="p-8 rounded-t-lg object-cover h-60 w-96"
                    src={card.image}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {card.nama_lapak}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light text-gray-900 dark:text-white">
                        {card.alamat_lapak}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {card.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-l font-light text-gray-900 dark:text-white">
                        {card.contact_lapak}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Link
                        to={`/koordinator/edit-lapak/${card.id_lapak}`}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm font-bold md:py-2 md:px-4 rounded-full"
                      >
                        <ion-icon
                          className="justify-center"
                          name="create-outline"
                        ></ion-icon>
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <Button
                        onClick={() => deleteData(card.id_lapak)}
                        className="bg-red-500 hover-bg-red-700 text-white text-sm font-bold md:py-2 md:px-4 rounded-full"
                      >
                        <ion-icon
                          className="justfy-center"
                          name="trash-outline"
                        ></ion-icon>
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Data tidak tersedia atau sedang dimuat...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default KoordinatorLapak
