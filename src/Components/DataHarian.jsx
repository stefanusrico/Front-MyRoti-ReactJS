import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTable, usePagination } from "react-table"
import NavAdmin from "./NavbarAdmin"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import NavKeuangan from "./NavbarKeuangan"

function DataHarian() {
  const [data, setData] = useState([])
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [showModal, setShowModal] = useState(false)
  const [formInput, setFormInput] = useState({
    jumlah_roti_terjual: "",
    pendapatan: "",
    catatan: "",
    tanggal_transaksi: "",
  })

  const columns = React.useMemo(
    () => [
      {
        Header: "Lapak",
        accessor: "lapak",
      },
      {
        Header: "Kurir",
        accessor: "kurir",
      },
      {
        Header: "Roti Terjual",
        accessor: "jumlah_roti_terjual",
      },
      {
        Header: "Roti Tidak Terjual",
        accessor: "jumlah_roti_tidak_terjual",
      },
      {
        Header: "Pendapatan",
        accessor: "pendapatan",
      },
      {
        Header: "Hutang",
        accessor: "hutang",
      },
      {
        Header: "Catatan",
        accessor: "catatan",
      },
      {
        Header: "Tanggal Transaksi",
        accessor: "tanggal_transaksi",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <>
            <div className="flex gap-3 justify-between">
              <Link>
                <button
                  className="text-red-700"
                  onClick={() => handleEdit(row.original.id)}
                >
                  Edit
                </button>
              </Link>
              <Link>
                <button
                  className="text-red-700"
                  onClick={() => handleDelete(row.original.id)}
                >
                  Delete
                </button>
              </Link>
            </div>
          </>
        ),
      },
    ],
    []
  )

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete-transaksi/${id}`)
        getData()
        Swal.fire({
          title: "Deleted!",
          text: "Keuangan has been deleted.",
          icon: "success",
        })
      } catch (error) {
        console.error("Error deleting data:", error)
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the data.",
          icon: "error",
        })
      }
    }
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  )

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get-transaksi-harian",
        {
          params: {
            tanggal: selectedDate,
          },
        }
      )
      const dataHarian = response.data.message
      setData(dataHarian)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleEdit = (id) => {
    const selectedItem = data.find((item) => item.id === id)

    setFormInput({
      ...selectedItem,
      id: id,
    })

    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleFormInputChange = (e) => {
    const { name, value } = e.target
    setFormInput((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const submitForm = async () => {
    try {
      const formData = new FormData()
      formData.append("jumlah_roti_terjual", formInput.jumlah_roti_terjual)
      formData.append("pendapatan", formInput.pendapatan)
      formData.append("catatan", formInput.catatan)
      formData.append("tanggal_transaksi", formInput.tanggal_transaksi)

      if (
        !formInput.jumlah_roti_terjual ||
        !formInput.pendapatan ||
        !formInput.tanggal_transaksi
      ) {
        console.error("Required fields are missing")
        return
      }

      const idToUpdate = formInput.id

      const response = await axios.put(
        `http://127.0.0.1:8000/api/update-transaksi/${idToUpdate}`,
        formData
      )

      console.log(response.data)
      setShowModal(false)
      getData()
    } catch (error) {
      console.error("Error submitting form:", error)
      if (error.response) {
        console.error(
          "Server responded with non-2xx status",
          error.response.data
        )
      } else if (error.request) {
        console.error("No response received from the server")
      } else {
        console.error("Error setting up the request", error.message)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [selectedDate])

  return (
    <>
      <NavKeuangan />
      <div className="md:mt-4 bg-gray-100 text-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
                <div className="flex items-center space-x-4 mt-4">
                  <label htmlFor="datePicker">Select Date:</label>
                  <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <table
                  {...getTableProps()}
                  className="divide-y divide-gray-900 w-full ml-auto mr-4"
                >
                  <thead className="dark:bg-gray-800">
                    {headerGroups.map((headerGroup) => (
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                      >
                        {headerGroup.headers.map((column) => (
                          <th
                            scope="col"
                            className="odd:bg-gray-700 even:bg-gray-800 px-16 py-6 text-left text-base font-medium text-white uppercase tracking-wider"
                            {...column.getHeaderProps()}
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    className="bg-light divide-y divide-gray-700"
                    {...getTableBodyProps()}
                  >
                    {page.map((row) => {
                      prepareRow(row)
                      return (
                        <tr
                          key={row.id}
                          {...row.getRowProps()}
                          className="odd:bg-gray-700 even:bg-gray-800 text-white hover:bg-gray-600 focus:outline-none"
                          style={{ cursor: "auto" }}
                        >
                          {row.cells.map((cell) => (
                            <td
                              key={cell.row.id + cell.column.id}
                              className="px-16 py-6 whitespace-nowrap"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="pagination flex items-center justify-center space-x-4 mt-4">
                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className={`${
                      !canPreviousPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {"<<"}
                  </button>{" "}
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className={`${
                      !canPreviousPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {"<"}
                  </button>{" "}
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className={`${
                      !canNextPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {">"}
                  </button>{" "}
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className={`${
                      !canNextPage
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {">>"}
                  </button>{" "}
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                  <span>
                    | Go to page:{" "}
                    <input
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0
                        gotoPage(page)
                      }}
                      className="w-20 p-1 text-center border border-gray-400 rounded"
                    />
                  </span>{" "}
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value))
                    }}
                    className="p-1 border border-gray-400 rounded"
                  >
                    {[5, 10, 15, 20, 30, 40, 50, 60].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-120">
            <h2 className="text-xl font-semibold mb-4">Your Form Title</h2>
            <form className="flex flex-row justify-between">
              <div className="w-1/2 pr-2">
                {/* Left Column */}
                <div className="mb-4">
                  <label
                    htmlFor="jumlah_roti_terjual"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Roti Terjual:
                  </label>
                  <input
                    type="number"
                    id="jumlah_roti_terjual"
                    name="jumlah_roti_terjual"
                    value={formInput.jumlah_roti_terjual}
                    onChange={handleFormInputChange}
                    // disabled
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {/* <div className="mb-4">
                  <label
                    htmlFor="jumlah_roti_tidak_terjual"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Roti Tidak Terjual:
                  </label>
                  <input
                    type="number"
                    id="jumlah_roti_tidak_terjual"
                    name="jumlah_roti_tidak_terjual"
                    value={formInput.jumlah_roti_tidak_terjual}
                    onChange={handleFormInputChange}
                    disabled
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div> */}
                <div className="mb-4">
                  <label
                    htmlFor="pendapatan"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Pendapatan :
                  </label>
                  <input
                    type="number"
                    id="pendapatan"
                    name="pendapatan"
                    value={formInput.pendapatan}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="w-1/2 pl-2">
                {/* Right Column */}
                <div className="mb-4">
                  <label
                    htmlFor="catatan"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Catatan:
                  </label>
                  <input
                    type="text"
                    id="catatan"
                    name="catatan"
                    value={formInput.catatan}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="tanggal_transaksi"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Tanggal Transaksi:
                  </label>
                  <input
                    type="date"
                    id="tanggal_transaksi"
                    name="tanggal_transaksi"
                    value={formInput.tanggal_transaksi}
                    onChange={handleFormInputChange}
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={submitForm}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DataHarian
