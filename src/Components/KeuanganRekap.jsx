import React from "react";
import NavKeuangan from "../Components/NavbarKeuangan";
import { Button } from "@material-tailwind/react";

function KeuanganRekap() {
    return (
        <>
            <NavKeuangan />
            <div className="md:p-6 mt-20 md:ml-64 bg-gray-100 border-gray-400 dark:bg-gray-800 dark:border-gray-700 rounded-sm">
                <div>
                    <Button className="flex flex-row items-center p-1 md:gap-1 m-3 text-black bg-gray-300 border-2 hover-bg-blue focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"><ion-icon name="add-circle-outline"></ion-icon>
                        Tambah
                    </Button>
                </div>

                <table className="md:text-base md:w-full">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide md:text-center text-gray-500 uppercase dark:text-gray-400 dark:bg-gray-800">
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Lapak</th>
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Roti Terjual</th>
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Roti Tidak Terjual</th>
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Roti Basi</th>
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Pendapatan</th>
                            <th className="border-2 dark:border-gray-400 md:px-3 md:pt-1">Hutang</th>
                        </tr>
                    </thead>

                    <tbody className="text-center divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr className="text-gray-700 dark:text-gray-400">
                            <td className="border-2 dark:border-gray-400 px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                        <img
                                            className="object-cover w-full h-full rounded-full"
                                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                            alt=""
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Lapak1</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Bandung</p>
                                    </div>
                                </div>
                            </td>
                            <td className="border-2 dark:border-gray-400 md:px-4 md:py-3 text-xs">1200</td>
                            <td className="border-2 dark:border-gray-400 md:px-4 md:py-3 text-xs">200</td>
                            <td className="border-2 dark:border-gray-400 md:px-4 md:py-3 text-xs">15</td>
                            <td className="border-2 dark:border-gray-400 md:px-4 md:py-3 text-xs">40000</td>
                            <td className="border-2 dark:border-gray-400 md:px-4 md:py-3 text-xs">4500</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end">
                    <Button className="flex flex-row items-center p-1 md:gap-1 m-3 text-black bg-red-400 border-2 hover-bg-blue focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"><ion-icon name="trash"></ion-icon>
                        Hapus
                    </Button>
                    <Button className="flex flex-row items-center p-1 md:gap-1 m-3 text-black bg-gray-300 border-2 hover-bg-blue focus:ring-4 focus:outline focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"><ion-icon name="create-outline"></ion-icon>
                        Edit
                    </Button>
                </div>
                
            </div>
        </>
    );
}
export default KeuanganRekap;
