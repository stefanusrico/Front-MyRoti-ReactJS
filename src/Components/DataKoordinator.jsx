import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTable } from "react-table"
import NavAdmin from "./NavbarAdmin"
import { Link } from "react-router-dom"

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
        accessor: "username", // Akses username dari relasi user
      },
      {
        Header: "Password",
        accessor: "password", // Akses password dari relasi user
      },
      {
        Header: "Role",
        accessor: "role", // Akses role dari relasi user
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <>
            <div className="flex justify-between">
              <Link to={`/edit/${row.original.id}`}>Edit</Link>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/data-koordinator"
      )
      const adminKoordinator = response.data
      console.log(adminKoordinator)
      setData(adminKoordinator)
    } catch (error) {
      console.error("Error fetching data:", error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      // Make an HTTP request to delete the data based on the ID
      await axios.delete(`http://127.0.0.1:8000/api/data-koordinator/${id}`)
      // After successful deletion, you may want to refresh the data in the table
      getData()
    } catch (error) {
      console.error("Error deleting data:", error)
    }
  }

  const navigateEdit = (id) => {
    window.location.href = `admin/dashboard/${id}`
  }

  const handleUpdate = async (id) => {
    try {
      // Make an HTTP request to delete the data based on the ID
      await axios.put(`http://127.0.0.1:8000/api/data-koordinator/${id}`)
      // After successful deletion, you may want to refresh the data in the table
      getData()
    } catch (error) {
      console.error("Error updating data:", error)
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
                    {rows.map((row) => {
                      prepareRow(row)
                      return (
                        <tr
                          key={row.id}
                          {...row.getRowProps()}
                          className="odd:bg-gray-700 even:bg-gray-800 text-white hover:bg-gray-600 hover:cursor-pointer focus:outline-none"
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                key={cell.column.id}
                                className="px-16 py-6 whitespace-nowrap"
                                {...cell.getCellProps()}
                              >
                                {cell.column.id === "user.username"
                                  ? cell.row.original.user
                                    ? cell.row.original.user.username
                                    : ""
                                  : cell.column.id === "user.password"
                                  ? cell.row.original.user
                                    ? cell.row.original.user.password
                                    : ""
                                  : cell.column.id === "user.role"
                                  ? cell.row.original.user
                                    ? cell.row.original.user.role
                                    : ""
                                  : cell.render("Cell")}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataKoordinator
