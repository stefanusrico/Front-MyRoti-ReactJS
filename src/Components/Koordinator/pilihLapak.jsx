import NavKoor from "../NavKoor";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Navbar } from "@material-tailwind/react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { profil } from "../../assets/index";

// import gambarWarung from "../assets/gambarwarung.jpg"

function pilihLapak() {
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [lapak, setLapak] = useState([]);
  const [area, setArea] = useState([]);
  const [formData, setFormData] = useState({
    area_id: "1",
  });

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
      console.log("data ",dataLapak);
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
        id_kurir: id,
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
    getLapak();
    getArea();
  }, []);

  return (
    <>
      <NavKoor />

      <div className="h-screen overflow-y-auto">
        {card[0] && (
          <div className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center">
            <div className=" border-gray-200 rounded-lg  p-2-0-0-0 p-0 ">
              <div className="flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="p-2 rounded-t-lg"
                  src={profil}
                  alt="kurir image"
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
                    className="w-80 h-120 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl"
                  >
                    <div
                      class="m-2 group px-10 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative 
                  after:absolute after:h-full after:bg-Raw-sienna z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg 
                  transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&amp;_p]:delay-200 [&amp;_p]:transition-all"
                    >
                      <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                        <img
                          src={lapak.image_url}
                          alt={`card-image-${index}`}
                          className="object-cover h-60/2 w-96/2"
                        />
                      </div>
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
                            className="bg-Raw-sienna hover:bg-white text-white hover:text-Raw-sienna text-sm font-bold py-2 px-8 rounded-full"
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
export default pilihLapak;
