import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import LogoRoti from "../assets/LogoRoti.png"

function NavKurir() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const [user, setUser] = useState({
        id: null,
        name: "",
        token: "",
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleLogout = () => {
        // Use the token from the user state
        axios
            .post("http://127.0.0.1:8000/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((response) => {
                console.log("Logout berhasil", response.data)

                // Clear user and token data after successful logout
                setUser({
                    id: null,
                    name: "",
                    token: "",
                })

                // You can also clear the token from storage if needed
                localStorage.removeItem("user")
            })
            .catch((error) => {
                console.error("Error saat logout", error)
            })
    }

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full bg-Raw-sienna border-2 border-coklat dark:bg-gray-800 dark:border-gray-700 ${sidebarOpen ? "md:ml-64" : ""
                    }`}
            >
                <div className="px-3 py-5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                onClick={toggleSidebar}
                                className="text-xl inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <ion-icon name="menu"></ion-icon>
                            </button>
                            <a href="http://instagram.com/cozr17" className="flex ml-2 md:mr-24">
                                <img src={LogoRoti} className="h-8 mr-3" alt="Logo MyRoti" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    MyRoti
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center ml-3">
                            <div>
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    aria-expanded={dropdownOpen ? "true" : "false"}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                        alt="user photo"
                                    ></img>
                                </button>
                                {dropdownOpen && (
                                    <div
                                        className="z-50 absolute mt-3 right-3 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="dropdown-user"
                                    >
                                        <div className="px-4 py-3" role="none">
                                            <p
                                                className="text-sm text-gray-900 dark:text-white"
                                                role="none"
                                            >
                                                Bang Kurir
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                role="none"
                                            >
                                                kurir.roti@myroti.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a
                                                    href="/"
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-Sienna border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">

                        <li>
                            <a
                                href="/kurir/pengiriman"
                                className="text-2xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <ion-icon name="car"></ion-icon>
                                <span className="text-base flex-1 ml-3 whitespace-nowrap">Pengiriman</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/kurir/rekappengiriman"
                                className="text-2xl flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover-bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <ion-icon name="reader"></ion-icon>
                                <span className="text-base flex-1 ml-3 whitespace-nowrap">Rekap pengiriman</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default NavKurir