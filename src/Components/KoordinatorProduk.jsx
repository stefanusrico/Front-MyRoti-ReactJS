import NavKoor from "./NavKoor"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@material-tailwind/react"
// import gambarProduct from "../assets/...jpg"

function KoordinatorProduct() {
    const [isFormVisible, setFormVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [formData, setFormData] = useState({
        image: null,
        nama_barang: "",
        deskripsi: "",
        harga_barang: "",
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
            const data = new FormData()
            data.append("image", selectedImage)
            data.append("nama_barang", formData.nama_barang)
            data.append("deskripsi", formData.deskripsi)
            data.append("harga_barang", formData.harga_barang)

            const response = await axios.post(
                "http://127.0.0.1:8000/api/product",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            console.log("Data berhasil ditambahkan:", response.data)

            // Ambil data terbaru setelah menambahkan data
            getData()

            // Reset formulir
            setFormData({
                image: null,
                nama_barang: "",
                deskripsi: "",
                harga_barang: "",
            })

            // Sembunyikan formulir
            toggleFormVisibility()
        } catch (error) {
            console.error("Error adding data:", error)
        }
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }

    const getData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/product")
            const productData = response.data
            setCards(productData)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    const editData = (data) => {
        setEditMode(true)
        setEditFormData(data)
        setFormData({
            nama_barang: data.nama_barang,
            deskripsi: data.deskripsi,
            harga_barang: data.harga_barang,
        })
        toggleFormVisibility()
    }

    const [editFormData, setEditFormData] = useState(null)

    const handleEdit = async () => {
        try {
            if (editFormData) {
                const response = await axios.put(
                    `http://127.0.0.1:8000/api/product/${editFormData.id}`,
                    formData // Menggunakan formData untuk mengirim data yang diperbarui
                )

                // Dapatkan data terbaru setelah mengedit data
                getData()

                // Reset formulir
                setEditFormData(null)
                setFormData({
                    image: "",
                    nama_barang: "",
                    deskripsi: "",
                    harga_barang: "",
                })

                // Sembunyikan formulir
                toggleFormVisibility()
                setEditMode(false)
            } else {
                console.error("Tidak ada data yang akan diubah.")
            }
        } catch (error) {
            console.error("Error updating data:", error)
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/product/${id}`
            )
            // Dapatkan data terbaru setelah menghapus data
            getData()
        } catch (error) {
            console.error("Error deleting data:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editMode) {
            handleEdit()
        } else {
            addData()
        }
    }

    return (
        <>
            <NavKoor />
            <div className="md:p-20 md:pt-20 md:pb-52 md:ml-48 scroll max-h-[100vh] overflow-y-auto">
                <div className="p-16 border-2 bg-gray-100 border-gray-400 rounded-lg dark:border-gray-700 ">
                    <div>
                        <Button
                            onClick={toggleFormVisibility}
                            className="flex flex-row items-center p-3 gap-3 m-4 text-black bg-coklat-kuning border-4 hover-bg-slate-50 focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <span className="hidden sm:inline">Tambah Product</span>
                        </Button>
                    </div>
                    {isFormVisible && (
                        <form
                            onSubmit={handleSubmit}
                            className="md:p-10 md:m-2 md:border-2 bg-gray-100 border-gray-200 rounded-lg dark:border-gray-700"
                            action="POST"
                        >
                            <div>
                                <input
                                    className="md:mb-1 md:w-44 md:border-2 border-gray-700 rounded-md"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImage}
                                    disabled={editMode}
                                />
                            </div>
                            <div>
                                <input
                                    className="md:mb-1 md:w-44 md:border-2 border-gray-700 rounded-md"
                                    type="text"
                                    name="nama_product"
                                    placeholder="Nama Product"
                                    autoComplete="off"
                                    value={formData.nama_product}
                                    onChange={handleInputChange}
                                    disabled={editMode}
                                />
                            </div>
                            <div>
                                <input
                                    className="md:mb-1 md:w-44 md:border-2 border-gray-700 rounded-md"
                                    type="text"
                                    name="deskripsi"
                                    placeholder="Deskripsi"
                                    autoComplete="off"
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <input
                                    className="md:mb-1 md:w-44 md:border-2 border-gray-700 rounded-md"
                                    type="text"
                                    name="harga_product"
                                    placeholder="Harga Product"
                                    autoComplete="off"
                                    value={formData.harga_product}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="w-full max-w-sm bg-white border border-gray-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <img
                                        className="p-8 rounded-t-lg object-cover h-60 w-96"
                                        src={card.image}
                                        alt="product image"
                                    />
                                    <div className="px-5 pb-5">
                                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {card.nama_warung}
                                        </h5>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-light text-gray-900 dark:text-white">
                                                {card.alamat_warung}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-light text-gray-900 dark:text-white">
                                                {card.area}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-l font-light text-gray-900 dark:text-white">
                                                {card.contact_warung}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <Button
                                                onClick={() => editData(card)}
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm font-bold md:py-2 md:px-4 rounded-full"
                                            >
                                                <ion-icon
                                                    className="justify-center"
                                                    name="create-outline"
                                                ></ion-icon>
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                            <Button
                                                onClick={() => deleteData(card.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold md:py-2 md:px-4 rounded-full"
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

export default KoordinatorProduct
