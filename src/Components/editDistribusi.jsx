import NavKoor from "./NavKoor";
import React, { useState, useEffect } from "react";
import axios from "axios";
import profil from "../assets/profil.png";
import { checklist, delivered, trash } from "../assets";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

function KoordinatorLapak() {
  const { idKurir, idLapak } = useParams();
  const [card, setCard] = useState({}); //untuk profil kurir
  const [lapak, setLapak] = useState([]);
  const [roti, setRoti] = useState([]);
  const [showAlert, setShowAlertSuccess] = useState(false);
  const [showNotifDelete, setShowAlertDelete] = useState(false);
  const [showNotifDelivered, setShowAlertDelivered] = useState(false);
  const [value, setValue] = useState("");
  const [dataTabel, setDataTabel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tuplesPerPage = 5;

  const getKurir = async () => {
    try {
      console.log("id : ", idKurir);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/kurir/${idKurir}`
      );
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
      const response = await axios.get(
        `http://127.0.0.1:8000/api/lapak-id/${idLapak}`
      );
      const dataLapak = response.data;
      console.log(dataLapak);
      setLapak(dataLapak);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRoti = async () => {
    try {
      console.log("Data Roti:", roti);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/roti-dd/${idLapak}`
      );
      const dataRoti = response.data;
      console.log(dataRoti);
      setRoti(dataRoti);
      console.log("Data Roti:", roti);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Selected ${name}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    jumlah_roti: " ",
    roti_id: " ",
  });

  const editLapak = async () => {
    console.log("Editing lapak with r:", idKurir, formData.roti_id, idLapak);
    console.log("FormData.roti_id:", formData.roti_id, formData.jumlah_roti);

    try {
      // e.preventDefault();
      const postData = {
        lapak_id: idLapak,
        roti_id: formData.roti_id,
        jumlah_roti_alokasi: formData.jumlah_roti,
        keterangan: "In Progress",
      };

      const postResponse = await axios.post(
        "http://127.0.0.1:8000/api/alokasi",
        postData
      );

      console.log("Data berhasil ditambahkan:", postResponse.data);
      setShowAlertSuccess(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hapusAlokasi = async (idAlokasi) => {
    try {
      console.log("id alokasi:", idAlokasi);
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}`
      );
      const dataAlokasi = response.data;
      console.log(dataAlokasi);
      window.location.reload();
    } catch {
      console.error("Error delete data:", error);
    }
  };

  const TABLE_HEAD = [
    "Id",
    "Nama Lapak",
    "Nama Kurir",
    "Jenis Roti",
    "Jumlah Roti",
    "keterangan",
    "",
    "",
  ];

  const fetchDataTabel = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/alokasi-keterangan/${idLapak}`
      );
      const fetchedData = response.data;
      if (fetchedData.length === 0) {
        console.log("Data kosong");
      } else {
        setDataTabel(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const buttonKeterangan = async (idAlokasi) => {
    console.log("Editing lapak with id:", idAlokasi);
    try {
      const data = {
        keterangan: "Done!",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}`,
        data
      );
      console.log("Alokasi sudah di update", response.data);
      window.location.reload();
    } catch (error) {
      console.error("gagal", error);
    }
  };

  useEffect(() => {
    getKurir();
    getLapak();
    getRoti();
    fetchDataTabel();
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
      {showNotifDelete && (
        <div className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center h-screen">
          <div className="w-56 bg-gray-100 p-8 gap-4 rounded-lg shadow-md text-center flex flex-col items-center mx-auto">
            <p className="notificationHeading text-black font-semibold text-sm">
              Menghapus Data {console.log("data", value)}
            </p>
            <img
              src={trash}
              className="w-20 mx-0 my-2 fill-current"
              viewBox="0 0 512 512"
              alt=""
            />
            <p className="notificationPara text-gray-500 text-xs font-semibold text-center">
              berhasil Menghapus
            </p>
            <div className="buttonContainer flex flex-col gap-2">
              <button
                className="AllowBtn w-32 h-8 bg-red-500 text-white rounded-full text-xs font-semibold cursor-pointer focus:outline-none hover:bg-white hover:text-red-500"
                onClick={() => {
                  hapusAlokasi(value);
                }}
              >
                Oke
              </button>
            </div>
            <div className="buttonContainer flex flex-col gap-2">
              <button
                className="AllowBtn w-32 h-8 bg-red-500 text-white rounded-full text-xs font-semibold cursor-pointer focus:outline-none hover:bg-white hover:text-red-500"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showNotifDelivered && (
        <div className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center h-screen">
          <div className="w-56 bg-gray-100 p-8 gap-4 rounded-lg shadow-md text-center flex flex-col items-center mx-auto">
            <p className="notificationHeading text-black font-semibold text-sm">
              Konfirmasi {console.log("data", value)}
            </p>
            <img
              src={delivered}
              className="w-20 mx-0 my-2 fill-current"
              viewBox="0 0 512 512"
              alt=""
            />
            <p className="notificationPara text-gray-500 text-xs font-semibold text-center">
              Sudah Terkirim
            </p>
            <div className="buttonContainer flex flex-col gap-2">
              <button
                className="AllowBtn w-32 h-8 bg-yellow-500 text-white rounded-full text-xs font-semibold cursor-pointer focus:outline-none hover:bg-white hover:text-yellow-500"
                onClick={() => buttonKeterangan(value)}
              >
                Next
              </button>
            </div>
            <div className="buttonContainer flex flex-col gap-2">
              <button
                className="AllowBtn w-32 h-8 bg-yellow-500 text-white rounded-full text-xs font-semibold cursor-pointer focus:outline-none hover:bg-white hover:text-yellow-500"
                onClick={() => window.location.reload()}
              >
                Cancel
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
                  className="p-8 rounded-t-lg"
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
                    {/* {card[0].id} */}
                    <p>Nilai id kurir: {idKurir}</p>
                    <p>Nilai id lapak: {idLapak}</p>
                  </h5> 
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-20 pb-4 sm:ml-64 overflow-y-auto flex items-center justify-center">
          <div className="w-60 h-80 bg-white p-6 flex flex-col gap-4 rounded-xl shadow-md">
            <div>
              <h5 className="text-xl font-semibold text-gray-900 text-center">
                {lapak.nama_lapak}
              </h5>
              <p className="text-gray-500 text-center">{lapak.alamat_lapak}</p>
              <p className="text-gray-500 text-center">{lapak.area}</p>
            </div>
            <div className="flex flex-col">
              {roti.length > 0 ? (
                <select
                  name="roti_id"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleInputChange}
                >
                  {roti.map((roti, index) => (
                    <option key={index} value={roti.id}>
                      {roti.nama_roti}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-center text-gray-500">
                  Sudah tidak bisa mengirim roti lagi..
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                name="jumlah_roti"
                placeholder="Jumlah Roti"
                autoComplete="off"
                value={formData.jumlah_roti}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                onClick={() => {
                  editLapak();
                }}
                className="w-full p-2 text-white bg-blue-500 border border-blue-500 rounded-full transition duration-200 hover:bg-transparent hover:border-blue-500 hover:text-blue-500 focus:outline-none focus-visible:outline-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <Card
          className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center"
          style={{ maxHeight: "80vh", maxWidth: "85%" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTabel
                .slice(
                  (currentPage - 1) * tuplesPerPage,
                  currentPage * tuplesPerPage
                )
                .map((rowData, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}
                  >
                    {Object.values(rowData).map((value, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    ))}

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelivered(true);
                            setValue(rowData.id);
                          }}
                          className={`w-full p-2 text-white rounded-full transition duration-200 focus:outline-none focus-visible:outline-red-600 ${
                            rowData.keterangan === "Done!"
                              ? "bg-green-500 hover:bg-white hover:text-green-500"
                              : rowData.keterangan === "In Progress"
                              ? "bg-yellow-500 hover:bg-white hover:text-yellow-500"
                              : "bg-red-500 hover:bg-white hover:text-red-500"
                          }`}
                        >
                          {rowData.keterangan}
                        </button>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelete(true);
                            setValue(rowData.id);
                            // hapusAlokasi(rowData.id);
                          }}
                          className="w-full p-2 text-white bg-red-500 border border-red-500 rounded-full transition duration-200 hover:bg-white hover:text-red-500 focus:outline-none focus-visible:outline-red-600"
                        >
                          Cancel
                        </button>
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>

        {/* Tampilkan navigasi halaman */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 font-medium text-white bg-blue-500 border border-blue-500 rounded-full focus:outline-none focus-visible:outline-blue-500"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(dataTabel.length / tuplesPerPage))
              )
            }
            disabled={
              currentPage === Math.ceil(dataTabel.length / tuplesPerPage)
            }
            className="px-4 py-2 mx-1 font-medium text-white bg-blue-500 border border-blue-500 rounded-full focus:outline-none focus-visible:outline-blue-500"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default KoordinatorLapak;
