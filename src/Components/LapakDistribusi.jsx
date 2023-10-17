import NavKoor from "./NavKoor"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
// import LogoRoti from "../assets/LogoRoti.png"

function LapakDistribusi() {
  const navigateTo = useNavigate()
  const [cards, setCards] = useState([])

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/lapak")
      const lapakData = response.data
      setCards(lapakData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <NavKoor />
      <div className="p-20 sm:ml-64 scroll">
        <div className="p-10 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="p-8 rounded-t-lg object-cover h-60 w-96"
                    src={card.image}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {card.nama_warung}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {card.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {card.alamat_warung}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {card.contact_warung}
                      </span>
                    </div>
                    <div className="flex items-center justify-center mt-3">
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-8 rounded-full"
                        onClick={() =>
                          navigateTo(`/koordinator/pilih-kurir/${card.id}`)
                        }
                      >
                        Kirim Produk
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

export default LapakDistribusi
