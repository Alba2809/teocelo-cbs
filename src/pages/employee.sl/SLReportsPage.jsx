import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import InputSelect from "../../components/InputSelect";
import { useLamps } from "../../context/LampContext";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import "../../styles/ThTable.css";
import HeaderTittle from "../../components/HeaderTittle";

const options = ["Recibido", "Por atender", "Atendido"];

function SLReportsPage() {
  const { handleSubmit, setValue } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [lampUpdateStatus, setLampUpdateStatus] = useState(null);
  const { getLampReports, lampsReport: lamps, updateLamp } = useLamps();
  const [filterLamps, setFilterLamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(true);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchPerson();
    }
  };
  const handleSearchPerson = () => {
    const inputValueFixed = inputValue.trimStart();
    if (inputValueFixed != "") {
      const requestsFilter = lamps.filter((lamp) =>
        (
          lamp.user.firstname.toUpperCase() +
          " " +
          lamp.user.lastname.toUpperCase()
        ).includes(inputValueFixed.toUpperCase())
      );

      return setFilterLamps(requestsFilter);
    }

    setFilterLamps(lamps);
  };

  const onOptionChange = (opc, object) => {
    setValue("status", opc);

    setLampUpdateStatus(object);
  };

  const updateStatusLamp = handleSubmit(async (data) => {
    async function upLampRequest() {
      await updateLamp(lampUpdateStatus, data);
      setLoadingUpdate(true);
    }
    upLampRequest();
  });

  useEffect(() => {
    if (lampUpdateStatus !== null) {
      updateStatusLamp();
    }
  }, [lampUpdateStatus]);

  useEffect(() => {
    const fetchData = async () => {
      await getLampReports();
      setFilterLamps(lamps);
      setLampUpdateStatus(null);
      setLoading(false);
      setLoadingUpdate(false);
    };
    fetchData();
  }, [loading, loadingUpdate]);

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Reportes"} />
      <div className="flex flex-row-reverse mt-5 mr-5">
        <div className="relative ml-14 w-[23rem]">
          <input
            type="text"
            placeholder="Buscar por nombre"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            name="searchValue"
            className="w-full text-black pr-10 pl-2 py-2 rounded-lg border-[3px] border-[#6D1610] bg-white block placeholder-black font-montserrat"
          />
          <div className="absolute inset-y-0 right-0 px-[0.40rem] m-[0.5rem] flex items-center text-sm leading-5 bg-[#6D1610] rounded-md cursor-pointer">
            <LuSearch
              size="1.5em"
              style={{ color: "#ffffff" }}
              onClick={handleSearchPerson}
            />
          </div>
        </div>
      </div>
      <div className="m-10">
        <div className="max-h-[800px] min-h-[500px] overflow-y-auto overflow-x-hidden border-black border-[3px]">
          <table className="table-fixed border-separate border-spacing-2 w-full">
            <thead className="bg-white sticky top-0 z-20 h-10 lg:h-16 font-extrabold text-xl lg:text-2xl">
              <tr>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Fecha</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Nombre</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Número telefónico</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Ubicación de la lámpara</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Referencia</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Tipo de lámpara</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Estatus del reporte</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                </th>
              </tr>
            </thead>
            {loading && loadingUpdate ? (
              <tbody>
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filterLamps.map((report, i) => (
                    <motion.tr
                      key={i}
                      layout
                      className="h-9 lg:h-12 font-bold text-base lg:text-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", delay: i * 0.2 }}
                    >
                      <th className="border-[2px] rounded-md border-black p-2">
                        {formatDate(report.createdAt)}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {report.user.firstname + " " + report.user.lastname}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {report.phonenumber ?? "0000000000"}
                      </th>
                      <th>
                        <input
                          type="text"
                          defaultValue={
                            report.street +
                            " " +
                            report.number +
                            " " +
                            report.colony +
                            " " +
                            report.town
                          }
                          className="border-[2px] rounded-md border-black p-2 w-full truncate"
                          readOnly
                        />
                      </th>
                      <th>
                        <input
                          type="text"
                          defaultValue={report.commentsCitizen}
                          className="border-[2px] rounded-md border-black p-2 w-full truncate"
                          readOnly
                        />
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {report.typeLamp}
                      </th>
                      <th className="static">
                        <InputSelect
                          options={options}
                          style={`rounded-md border-[2px] ${
                            report.status === "Atendido"
                              ? "bg-[#54CC60]"
                              : "bg-[#FFFFFF]"
                          } h-9 lg:h-12`}
                          onOptionChange={onOptionChange}
                          object={report._id}
                          defaultValue={report.status}
                        />
                      </th>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default SLReportsPage;
