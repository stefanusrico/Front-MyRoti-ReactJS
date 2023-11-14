import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTable, usePagination } from "react-table"
import NavAdmin from "./NavbarAdmin"
import { Link } from "react-router-dom"

function PasswordCell({ password }) {
  const [showPassword, setShowPassword] = useState(false)
  // const history = useHistory()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      {showPassword ? <span>{password}</span> : <span>*********</span>}
      <i
        className={`fa ${
          showPassword ? "fa-eye-slash" : "fa-eye"
        } ml-2 cursor-pointer`}
        onClick={togglePasswordVisibility}
      ></i>
    </div>
  )
}

function DataKoordinator() {
  const [data, setData] = useState([])
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nama Koordinator",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Password",
        accessor: "password",
        Cell: ({ value }) => <PasswordCell password={value} />,
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <>
            <div className="flex justify-between">
              <Link to={`/edit-koordinator/${row.original.id}`}>Edit</Link>
              <Link>
                <button onClick={() => handleDelete(row.original.id)}>
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
    try {
      // Make an HTTP request to delete the data based on the ID
      await axios.delete(`http://127.0.0.1:8000/api/delete-koordinator/${id}`)
      // After successful deletion, you may want to refresh the data in the table
      getData()
    } catch (error) {
      console.error("Error deleting data:", error)
    }
  }

  // Define pagination options
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
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial pagination state
    },
    usePagination
  )

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/data-koordinator"
      )
      console.log(response)
      const adminKoordinator = response.data
      setData(adminKoordinator)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <NavAdmin />
      <div className="md:mt-4 bg-gray-100 text-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
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
                          style={{ cursor: "auto" }} // Set the cursor style to 'auto'
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                key={cell.row.id + cell.column.id}
                                className="px-16 py-6 whitespace-nowrap"
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            )
                          })}
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

export default DataKoordinator
