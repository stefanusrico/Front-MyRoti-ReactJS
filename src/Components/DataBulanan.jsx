import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTable, usePagination } from "react-table"
import NavKeuangan from "./NavbarKeuangan"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function DataBulanan() {
  const [data, setData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().split("-").slice(0, 2).join("-")
  ) // Initialize with the current month

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
            <div className="flex justify-between">
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
        "http://127.0.0.1:8000/api/get-transaksi-bulanan",
        {
          params: {
            month: selectedMonth.split("-")[1], // Extract month from selectedMonth
            year: selectedMonth.split("-")[0], // Extract year from selectedMonth
          },
        }
      )

      const dataMonthly = response.data.message
      setData(dataMonthly)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [selectedMonth])

  return (
    <>
      <NavKeuangan />
      <div className="md:mt-4 bg-gray-100 text-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
                <div className="flex items-center space-x-4 mt-4">
                  <label htmlFor="monthPicker">Select Month:</label>
                  <input
                    type="month"
                    id="monthPicker"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
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
    </>
  )
}

export default DataBulanan
