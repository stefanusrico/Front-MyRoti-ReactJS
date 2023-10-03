import React from "react";

export default function Registration() {
    return (
        <body className="bg-krem h-screen">
            <div className="p-16">
                <div className="rounded-lg border-black">
                    <div className="bg-coklat border-2 border-black rounded-lg">
                        <div className="text-center font-bold text-2xl p-5">REGISTRATION</div>

                        <div className="text-center text-l p-8"><p>Masukan Username</p>
                            <input className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                                type="text"
                                id="inputBox"
                                placeholder="Username"
                                autoComplete="none">
                            </input>
                        </div>

                        <div className="text-center text-l p-8"><p>Masukan Password</p>
                            <input className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                                type="password"
                                id="inputBox"
                                placeholder="Password"
                                autoComplete="none">
                            </input>
                        </div>

                        <div className="text-center text-m p-8"><p>Masukan Ulang Password</p>
                            <input className="p-2 w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-white"
                                type="password"
                                id="inputBox"
                                placeholder="Password"
                                autoComplete="none">
                            </input>
                        </div>

                        <div className="flex justify-center p-6">
                            <button className=" bg-krem border-2 border-black text-black rounded-xl py-2 px-5 hover:scale-90 duration-300 font-bold w-48">
                                REGISTER
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </body>
    )
}