import { forwardRef } from "react";
import { useExtaData } from "../context/ExtraDataContext";
import "../styles/InputNumber.css";

const PrintComponent = forwardRef(({ data }, ref) => {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  const { imageUrl } = useExtaData();

  return (
    <div className="font-montserrat mx-10" ref={ref}>
      <div className="w-full lg:w-[30%] mb-5 mt-10">
        <label className="font-bold text-2xl">Folio:</label>
        <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
          <input
            type="text"
            defaultValue={data.folio}
            className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
          />
        </div>
      </div>
      <div className="w-full lg:w-[30%] mb-5">
        <label className="font-bold text-2xl">Fecha de los hechos:</label>
        <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
          <input
            type="text"
            defaultValue={formatDate(data.createdAt)}
            className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-y-5 justify-between">
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Nombre(s):</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.firstname}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl break-alls">
            Apellido paterno:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.lastnameP}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Apellido materno:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.lastnameM}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Teléfono:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.phonenumber}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Correo electrónico:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="email"
              defaultValue={data.email}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">
            Confirmar correo electrónico:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="email"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.email}
            />
          </div>
        </div>
        <div className="w-full lg:w-[20%]">
          <label className="font-bold text-xl">Colina:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.colony}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
            />
          </div>
        </div>
        <div className="w-full lg:w-[15%]">
          <label className="font-bold text-xl">Código postal:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.pcode}
            />
          </div>
        </div>
        <div className="w-full lg:w-[35%] mt-16">
          <label className="font-bold text-xl">Calle:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.street}
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[10%]">
          <label className="font-bold text-xl">Núm. Ext:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.outnumber}
            />
          </div>
        </div>
        <div className="w-[45%] lg:w-[10%]">
          <label className="font-bold text-xl">Núm. Int:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.innumber}
            />
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">
            Nombre del servidor público:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.staffname}
            />
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">Cargo o puesto:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.staffcharge}
            />
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">Área en la que labora:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-black"
              defaultValue={data.staffarea}
            />
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          <label className="font-bold text-xl">
            Explicación de los hechos:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black">
            <textarea
              rows="8"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 border-black resize-none"
              defaultValue={data.commentsCitizen}
            ></textarea>
          </div>
        </div>
        <div className="w-full lg:w-[30%] mt-10">
          <div className="w-full flex justify-center">
            <div className="w-[70%] flex flex-col items-center">
              <label className="font-bold text-xl">Evidencia:</label>
              <div className="w-full flex justify-center">
                <button
                  className="bg-[#EFEEEE] font-bold p-5 rounded-md shadow-md"
                  type="button"
                >
                  <img src={imageUrl + data.image} alt="Image Preview" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PrintComponent;
