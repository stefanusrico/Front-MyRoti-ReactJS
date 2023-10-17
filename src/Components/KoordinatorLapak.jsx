import NavKoor from "./NavKoor"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@material-tailwind/react"
import gambarWarung from "../assets/gambarwarung.jpg"

function KoordinatorLapak() {
  const [isFormVisible, setFormVisible] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    // image: "",
    nama_warung: "",
    area: "",
    alamat_warung: "",
    contact_warung: "",
  })
  const [cards, setCards] = useState([])

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const addData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/lapak",
        formData
      )
      console.log("Data berhasil ditambahkan:", response.data)

      // Ambil data terbaru setelah menambahkan data
      getData()

      // Reset formulir
      setFormData({
        // image: "",
        nama_warung: "",
        area: "",
        alamat_warung: "",
        contact_warung: "",
      })

      // Sembunyikan formulir
      toggleFormVisibility()
    } catch (error) {
      console.error("Error adding data:", error)
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/lapak")
      const lapakData = response.data
      setCards(lapakData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const editData = (data) => {
    setEditMode(true);
    setEditFormData(data);
    setFormData({
      nama_warung: data.nama_warung,
      area: data.area,
      alamat_warung: data.alamat_warung,
      contact_warung: data.contact_warung,
    });
    toggleFormVisibility();
  };
  


  const [editFormData, setEditFormData] = useState(null);

  const handleEdit = async () => {
    try {
      if (editFormData) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/lapak/${editFormData.id}`,
          formData // Menggunakan formData untuk mengirim data yang diperbarui
        );

        // Dapatkan data terbaru setelah mengedit data
        getData();

        // Reset formulir
        setEditFormData(null);
        setFormData({
          nama_warung: "",
          area: "",
          alamat_warung: "",
          contact_warung: "",
        });

        // Sembunyikan formulir
        toggleFormVisibility();
        setEditMode(false)
      } else {
        console.error("Tidak ada data yang akan diubah.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }

  };


  const deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/lapak/${id}`);
      // Dapatkan data terbaru setelah menghapus data
      getData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      handleEdit();
    } else {
      addData();
    }
  };
  

  return (
    <>
      <NavKoor />
      <div className="p-20 sm:ml-64 scroll">
        <div className="p-10 border-2 border-gray-200 rounded-lg dark:border-gray-700">
          <div>
            <Button
              onClick={toggleFormVisibility}
              className="flex flex-row items-center p-3 gap-3 m-4 text-black bg-coklat-kuning border-4 hover-bg-slate-50 focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <svg
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 490 490"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M227.8,174.1v53.7h-53.7c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2h53.7v53.7c0,9.5,7.7,17.2,17.2,17.2 s17.1-7.7,17.1-17.2v-53.7h53.7c9.5,0,17.2-7.7,17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2 S227.8,164.6,227.8,174.1z"></path>{" "}
                        <path d="M71.7,71.7C25.5,118,0,179.5,0,245s25.5,127,71.8,173.3C118,464.5,179.6,490,245,490s127-25.5,173.3-71.8 C464.5,372,490,310.4,490,245s-25.5-127-71.8-173.3C372,25.5,310.5,0,245,0C179.6,0,118,25.5,71.7,71.7z M455.7,245 c0,56.3-21.9,109.2-61.7,149s-92.7,61.7-149,61.7S135.8,433.8,96,394s-61.7-92.7-61.7-149S56.2,135.8,96,96s92.7-61.7,149-61.7 S354.2,56.2,394,96S455.7,188.7,455.7,245z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                    <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                    <g> </g> <g> </g> <g> </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              Tambah Lapak
            </Button>
          </div>
          {isFormVisible && (
            <form
              onSubmit={handleSubmit}
              className="p-10 border-2 border-gray-200 rounded-lg dark:border-gray-700"
              action="POST"
            >
              {/* <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div> */}
              <div>
                <input
                  type="text"
                  name="nama_warung"
                  placeholder="Nama Warung"
                  value={formData.nama_warung}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="alamat_warung"
                  placeholder="Alamat Warung"
                  value={formData.alamat_warung}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="contact_warung"
                  placeholder="Contact Person Warung"
                  value={formData.contact_warung}
                  onChange={handleInputChange}
                />
              </div>
              <button
                  className="bg-transparant hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 mt-2 border border-blue-500 hover:border-transparent rounded-full"
                  type="submit"
                >
                  {editMode ? "Update" : "Simpan"}
              </button>
            </form>
          )}
          {/* Daftar produk lainnya */}
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="p-8 rounded-t-lg"
                    src={gambarWarung}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {card.nama_warung}
                    </h5>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {card.area}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-light text-gray-900 dark:text-white">
                        {card.alamat_warung}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-l font-light text-gray-900 dark:text-white">
                        {card.contact_warung}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Button onClick={() => editData(card)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm font-bold py-2 px-8 rounded-full">
                        Edit
                      </Button>
                      <Button onClick={() => deleteData(card.id)}
                        className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-6 rounded-full">
                        Delete
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
