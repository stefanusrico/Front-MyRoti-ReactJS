import NavKoor from "./NavKoor";
import { useState, useEffect } from "react";
import axios from "axios";
import profil from "../assets/profil.png";
import { Button, Navbar } from "@material-tailwind/react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { checklist, delivered, trash } from "../assets";

// import gambarWarung from "../assets/gambarwarung.jpg"

function KoordinatorLapak() {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [lapak, setLapak] = useState([]);
  const [area, setArea] = useState([]);
  const [formData, setFormData] = useState({
    area_id: "",
  });
  const [showAlert, setShowAlertSuccess] = useState(false);

  const getData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`http://127.0.0.1:8000/api/kurir/${id}`);
      const userData = response.data;
      console.log("nama1", response);
      console.log("nama2", userData);
      setCard(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLapak = async () => {
    try {
      console.log("area id", formData.area_id);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/lapak-area/${formData.area_id}`
      );
      const dataLapak = response.data;
      console.log(dataLapak);
      setLapak(dataLapak);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getArea = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/area");
      const area = response.data;
      console.log(area);
      setArea(area);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getIdLapak = async (idLapak) => {
    console.log("Editing lapak with id:", id);
    try {
      const data = {
        kurir_id: id,
        // jumlah_roti: formData.jumlah_roti,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/lapak/${idLapak}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("lapak sudah diisi id kurir:", response.data);
    } catch (error) {
      console.error("gagal", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    getLapak();
  };

  useEffect(() => {
    getData();
    // getLapak();
    getArea();
  }, []);

  return (
    <>
      <NavKoor />
      {showAlert && (
        <div className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center h-screen">
          <div className="w-56 bg-gray-100 p-8 gap-4 rounded-lg shadow-md text-center flex flex-col items-center mx-auto">
            <p className="notificationHeading text-black font-semibold text-sm">
              Notifikasi
            </p>
            <img
              src={checklist}
              className="w-20 mx-0 my-4 fill-current"
              viewBox="0 0 512 512"
              alt=""
            />
            <p className="mx-0 my-4 text-gray-500 text-xs font-semibold text-center">
              Berhasil Menambahkan Data Di Tabel Alokasi
            </p>
            <div className="buttonContainer flex flex-col gap-2">
              <button
                className="AllowBtn w-32 h-8 bg-green-500 text-white rounded-full text-xs font-semibold cursor-pointer focus:outline-none hover:bg-green-700"
                onClick={() => window.location.reload()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-screen overflow-y-auto">
        {card[0] && (
          <div className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center">
            <div className=" border-gray-200 rounded-lg  p-2-0-0-0 p-0 ">
              <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="p-2 rounded-t-lg"
                  src={profil}
                  alt="product image"
                />
                <div className="px-5 pb-1">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                    {card[0].nama_kurir}
                  </h5>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                    {card[0].area}
                  </h5>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
                    {card[0].id}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-0 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center w-full h-full">
          <select
            name="area_id"
            className="w-72 p-2 border border-gray-300 rounded-md"
            onClick={handleInputChange}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {area.map((area, index) => (
              <option key={index} value={area.id}>
                {area.nama_area}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-0 p-5 pr-5 sm:ml-64 scroll overflow-y-auto">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center mb-5 mt-20 ">
            DAFTAR LAPAK
          </h5>

          <div className="border-2 border-gray-200 rounded-lg dark:border-gray-700 p-2-0-2-0 p-2 overflow-y-auto">
            {lapak.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 overflow-y-auto">
                {lapak.map((lapak, index) => (
                  <div
                    key={index}
                    className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl"
                  >
                    <div
                      class="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative 
                  after:absolute after:h-full after:bg-[#abd373] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg 
                  transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all"
                    >
                      <p class="cardtxt font-semibold text-black tracking-wider group-hover:text-white text-xl text-center">
                        {lapak.nama_lapak}
                        <p>id kurir : {id}</p>
                      </p>
                      <p class="blueberry font-semibold text-gray-600 tracking-wider group-hover:text-white text-xs">
                        {lapak.area}
                      </p>
                      <p class="blueberry font-semibold text-gray-600 tracking-wider group-hover:text-white text-xs">
                        {lapak.alamat_lapak}
                      </p>
                      <div className="flex items-center justify-center mt-3 pb-5">
                        <Link to={`/edit-distribusi/${card[0].id}/${lapak.id}`}>
                          <Button
                            onClick={() => getIdLapak(lapak.id)}
                            className="bg-[#abd373] hover:bg-white text-white hover:text-[#abd373] text-sm font-bold py-2 px-8 rounded-full"
                          >
                            Tambahkan Lapak
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Data tidak tersedia atau sedang dimuat...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default KoordinatorLapak;
