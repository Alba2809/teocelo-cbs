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
            className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
          />
          <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
            Folio asignado
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[30%] mb-5">
        <label className="font-bold text-2xl">Fecha de los hechos:</label>
        <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
          <input
            type="text"
            defaultValue={formatDate(data.createdAt)}
            className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
          />
          <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
            Fecha en la que ocurrieron los hechos
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-5 justify-between">
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Nombre(s):</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.firstname}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Nombre(s)
            </p>
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
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Apellido paterno
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Apellido materno:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.lastnameM}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Apellido materno
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Teléfono:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.phonenumber}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Número de télefono
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">Correo electrónico:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="email"
              defaultValue={data.email}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Correo electrónico
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[30%]">
          <label className="font-bold text-xl">
            Confirmar correo electrónico:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="email"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.email}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Confirmación de correo electrónico
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[20%]">
          <label className="font-bold text-xl">Colina:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              defaultValue={data.colony}
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Colonia
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[15%]">
          <label className="font-bold text-xl">Código postal:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.pcode}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Código postal
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[35%] mt-16">
          <label className="font-bold text-xl">Calle:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.street}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Nombre de su calle
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[10%]">
          <label className="font-bold text-xl">Núm. Ext:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.outnumber}
            />
            <p className="text-center py-2 lg:py-1 text-[#6D1610] font-bold text-lg lg:text-sm">
              Núm. exterior
            </p>
          </div>
        </div>
        <div className="w-[45%] lg:w-[10%]">
          <label className="font-bold text-xl">Núm. Int:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="number"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.innumber}
            />
            <p className="text-center py-2 lg:py-1 text-[#6D1610] font-bold text-lg lg:text-sm">
              Núm. interior
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">
            Nombre del servidor público:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.staffname}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Nombre del servidor público
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">Cargo o puesto:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.staffcharge}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Cargo del servidor público
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[30%]">
          <label className="font-bold text-xl">Área en la que labora:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="text"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 border-black"
              defaultValue={data.staffarea}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Área del servidor público
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[60%]">
          <label className="font-bold text-xl">
            Explicación de los hechos:
          </label>
          <div className="bg-[#F1F1F1] border-2 border-black">
            <textarea
              rows="8"
              className="w-full text-black font-medium text-base lg:text-xl px-4 py-2 border-b-2 border-black resize-none"
              defaultValue={data.commentsCitizen}
            ></textarea>
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Escriba de manera clara y concreta los hechos que provoquen su
              queja o denuncia
            </p>
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
