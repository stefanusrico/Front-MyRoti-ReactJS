import React from "react";

export default function Registration() {
    return (
        <div className="bg-krem min-h-screen flex items-center justify-center">
            <div className="p-4 md:p-8 lg:p-16 w-full md:w-3/4 lg:w-2/4">
                <div className="rounded-lg border-black">
                    <div className="bg-coklat border-2 border-black rounded-lg">
                        <div className="text-center font-bold text-2xl p-5">REGISTRATION</div>
                        
                        <div className="text-center text-l p-4 md:p-6">
                            <p>Pilih Peran</p>
                            <select
                                className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning"
                                id="roleSelect"
                                name="roleSelect"
                            >
                                <option value="koordinator">Koordinator</option>
                                <option value="kurir">Kurir</option>
                                <option value="keuangan">Keuangan</option>
                            </select>
                        </div>

                        <div className="text-center text-l p-4 md:p-4">
                            <p>Masukkan Username</p>
                            <input
                                className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
                                type="text"
                                id="usernameInput"
                                placeholder="Username"
                                autoComplete="none"
                            />
                        </div>

                        <div className="text-center text-l p-4 md:p-4">
                            <p>Masukkan Password</p>
                            <input
                                className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
                                type="password"
                                id="passwordInput"
                                placeholder="Password"
                                autoComplete="none"
                            />
                        </div>

                        <div className="text-center text-m p-4 md:p-4">
                            <p>Masukkan Ulang Password</p>
                            <input
                                className="p-2 w-full md:w-64 border-2 border-black rounded-xl bg-coklat-kuning placeholder-black"
                                type="password"
                                id="confirmPasswordInput"
                                placeholder="Password"
                                autoComplete="none"
                            />
                        </div>

                        <div className="flex justify-center p-4 md:p-6">
                            <button className="bg-krem border-2 border-black text-black rounded-xl py-2 px-5 hover:scale-90 duration-300 font-bold w-full md:w-48">
                                REGISTER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
