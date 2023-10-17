import NavbarAdmin from "./NavbarAdmin";
import NavKoor from "./NavKoor"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTable } from "react-table";

function Kurir({ columns, data }) {
  const [card, setData] = useState([]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  
    const getData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/kurir")
        const adminKurir = response.data
        setCards(adminKurir)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    useEffect(() => {
      getData()
    }, []);
  // Render the UI for your table
  return (
    <>
    <NavKoor />
      <div className="md:mt-4 bg-gray-100 text-gray-900">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="md:p-10 md:ml-60 md:mt-7 border-2 border-gray-400">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
              <table {...getTableProps()} className="divide-y divide-gray-900 w-full ml-auto mr-4">
                <thead className="dark:bg-gray-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th scope="col" className="px-16 py-6 text-left text-base font-medium text-white uppercase tracking-wider" {...column.getHeaderProps()}>{column.render("Header")}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="bg-light divide-y divide-gray-700" {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="odd:bg-gray-700 even:bg-gray-800 text-white hover:bg-gray-600 hover:cursor-pointer focus:outline-none">
                        {row.cells.map((cell) => {
                          return <td className="px-16 py-6 whitespace-nowrap" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );

}

export default Kurir;
