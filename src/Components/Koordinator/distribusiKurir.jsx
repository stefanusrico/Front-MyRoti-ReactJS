import NavKoor from "../NavKoor";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { profil } from "../../assets/index";
import { useNavigate, Link } from "react-router-dom";

// import LogoRoti from "../assets/LogoRoti.png"

function kurirDistribusi() {
  const [cards, setCards] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/kurir");
      const userData = response.data;
      setCards(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavKoor />
      <div className="p-20 sm:ml-64 h-screen overflow-y-auto">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center mb-5 mt-20 ">
          DAFTAR KURIR
        </h5>

        <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700 p-2-0-2-0 p-2">
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="p-8 rounded-t-lg"
                    src={profil}
                    alt="product image"
                  />
                  <div className="px-5 pb-1">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                      {card.nama_kurir}
                    </h5>
                  </div>

                  <div className="flex items-center justify-center mt-3 pb-5">
                    <Link to={`/pilih-lapak/${card.id}`}>
                      <Button 
                        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-8 rounded-full">
                        Tambahkan Lapak
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Data tidak tersedia atau sedang dimuat...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default kurirDistribusi;
