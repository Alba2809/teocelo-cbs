import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { useComplaint } from "../../context/ComplaintContext";
import "../../styles/ThTable.css";
import HeaderTittle from "../../components/HeaderTittle";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "../../components/PrintComponent";

function CSComplaintsPage() {
  const [inputValue, setInputValue] = useState("");
  const { getComplaints, complaints } = useComplaint();
  const [filterComplaint, setFilterComplaint] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const complaintsFilter = complaints.filter((data) =>
        `${data.firstname.toUpperCase()} ${data.lastnameP.toUpperCase()} ${data.lastnameM.toUpperCase()}`.includes(
          inputValueFixed.toUpperCase()
        )
      );

      return setFilterComplaint(complaintsFilter);
    }

    setFilterComplaint(complaints);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getComplaints();
      setFilterComplaint(complaints);
      setLoading(false);
    };
    fetchData();
  }, [loading]);

  const printComponentRefs = useRef();
  const [dataSelected, setDataSelected] = useState(null);

  const handlePrint = (data) => setDataSelected(data);

  const print = useReactToPrint({
    content: () => printComponentRefs.current,
  });

  useEffect(() => {
    if (dataSelected) {
      print();
      setDataSelected(null);
    }
  }, [dataSelected]);

  return (
    <div>
      <div className="bg-white pt-6 pb-8 mt-5">
        <HeaderTittle title={"Quejas o denuncias contra servidores públicos"} />
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
                    <p className="p-3 break-words">Folio</p>
                    <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                  </th>
                  <th className="relative overflow-hidden">
                    <p className="p-3 break-words">Fecha</p>
                    <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                    <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                    <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                    <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                    <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                    <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                    <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                  </th>
                  <th className="relative overflow-hidden">
                    <p className="p-3 break-words">Nombre</p>
                    <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                  </th>
                  <th className="relative overflow-hidden">
                    <p className="p-3 break-words">Número telefónico</p>
                    <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                    <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                    <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                    <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                    <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                    <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                    <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                  </th>
                  <th className="relative overflow-hidden">
                    <p className="p-3 break-words">Documento generado</p>
                    <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                    <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                    <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                    <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                  </th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filterComplaint.map((data, i) => (
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
                          {data.folio}
                        </th>
                        <th className="border-[2px] rounded-md border-black p-2">
                          {formatDate(data.createdAt)}
                        </th>
                        <th className="border-[2px] rounded-md border-black p-2">
                          {`${data.firstname} ${data.lastnameP} ${data.lastnameM}`}
                        </th>
                        <th className="border-[2px] rounded-md border-black p-2">
                          {data.phonenumber ?? "0000000000"}
                        </th>
                        <th className="border-[2px] rounded-md border-black p-2 flex justify-center">
                          <motion.div
                            className="w-full flex"
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full">
                              <button
                                className="bg-[#6d1610] text-white rounded-full font-montserrat text-base lg:text-3xl py-1 px-1 lg:px-5 w-full"
                                type="button"
                                onClick={() => handlePrint(data)}
                              >
                                Descargar
                              </button>
                            </div>
                          </motion.div>
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
      <div className="hidden">
        {dataSelected && (
          <PrintComponent data={dataSelected} ref={printComponentRefs} />
        )}
      </div>
    </div>
  );
}

export default CSComplaintsPage;
