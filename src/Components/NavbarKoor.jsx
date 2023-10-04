import React, { useState } from "react";
import LogoRoti from "../assets/LogoRoti.png"

export default function Koordinator() {
    let [open, setOpen] = useState(false);
    return (
        <header className="bg-coklat-tua md:py-1 fixed w-full ">

            <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </div>

            <div className="md:flex item-center justify-normal py-1 md:pl-0 pl-9">
                <img
                    src={LogoRoti}
                    alt="Gambar"
                    className="w-16"
                />
                <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static
                            bg-coklat-tua md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-2 
                            transition-all duration-500 ease-in ${open ? "top-12" : "top-[-490px]"}`}>
                    <li className="md:ml-8 text-l md:my-0 my-7">
                        <a href="#" className="hover:text-blue-700 duration-300">Dashboard</a></li>
                    <li className="md:ml-8 text-l md:my-0 my-7">
                        <a href="#" className="hover:text-blue-700 duration-300">Distribusi</a></li>
                    <li className="md:ml-8 text-l md:my-0 my-7">
                        <a href="#" className="hover:text-blue-700 duration-300">Lapak</a></li>
                    <li className="md:ml-8 text-l md:my-0 my-7">
                        <a href="#" className="hover:text-blue-700 duration-300">Produk</a></li>
                </ul>
            </div>
        </header>
    )
}
