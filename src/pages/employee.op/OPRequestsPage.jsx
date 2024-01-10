import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useExtaData } from "../../context/ExtraDataContext";
import IconoX from "../../assets/Icons/IconoX.png";
import InputSelect from "../../components/InputSelect";
import "../../styles/ThTable.css";
import HeaderTittle from "../../components/HeaderTittle";
import { useOfficial } from "../../context/OfficialContext";
import { useAuth } from "../../context/AuthContext";

const options = ["Entregada", "En revisión", "Aceptada", "Rechazada"];

function OPRequestsPage() {
  const { handleSubmit, setValue, getValues } = useForm();
  const { getOfficial, updateOfficial, officials } = useOfficial();
  const { expTextGeneral, documentUrl } = useExtaData();
  const { getFile } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [inputComments, setInputComments] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updateAll, setUpdateAll] = useState(null);
  const [updateFile, setUpdateFile] = useState(null);
  const [filterRequests, setFilterRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(true);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonFile = (req) => {
    setUpdateFile(req);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onSubmitFile(file);
  };

  const onSubmitFile = async (file) => {
    const formData = new FormData();

    formData.append("document", file);
    try {
      const res = await updateOfficial(updateFile, formData);
      setLoadingUpdate(true);
    } catch (error) {}
  };

  const handleOpen = () => setOpen((prev) => !prev);

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
      const requestsFilter = officials.filter((req) =>
        (
          req.user.firstname.toUpperCase() +
          " " +
          req.user.lastname.toUpperCase()
        ).includes(inputValueFixed.toUpperCase())
      );

      return setFilterRequests(requestsFilter);
    }

    setFilterRequests(water);
  };

  const handleChangeTextarea = (event) => {
    const newValue = event.target.value;
    const regex = expTextGeneral;

    if (!regex.test(newValue) && newValue !== "") {
      event.target.value = getValues("commentsEmployee");
      return;
    }

    setValue("commentsEmployee", newValue);
  };

  const [aux, setAux] = useState(null);
  const handleClickDialog = (accept) => {
    handleOpen();

    if (!accept) {
      setLoadingUpdate(true);
      setLoading(true);
      return;
    }

    if (!inputComments) setValue("commentsEmployee", "Ninguno.");
    setUpdateAll(aux);
  };

  const onOptionChange = (opc, object) => {
    setValue("status", opc);

    if (opc === "Aceptada") {
      setAux(object);
      handleOpen();
      return;
    } else if (opc === "Rechazada") {
      setAux(object);
      handleOpen();
      return;
    } else {
      setUpdateStatus(object);
    }
  };

  const updateStatusRequest = handleSubmit(async (data) => {
    async function updateRequest() {
      if (updateStatus) await updateOfficial(updateStatus, data);
      else await updateOfficial(updateAll, data);
      setLoadingUpdate(true);
    }
    updateRequest();
  });

  const hanldeClickComments = (op) => {
    setInputComments(op);
  };

  useEffect(() => {
    if (updateStatus !== null) {
      updateStatusRequest();
    }
  }, [updateStatus]);

  useEffect(() => {
    if (updateAll !== null) {
      updateStatusRequest();
    }
  }, [updateAll]);

  useEffect(() => {
    const fetchData = async () => {
      await getOfficial();
      setFilterRequests(officials);
      setUpdateAll(null);
      setUpdateStatus(null);
      setAux(null);
      setLoading(false);
      setLoadingUpdate(false);
    };
    fetchData();
  }, [loading, loadingUpdate]);

  const handleDownload = async (documentName, folio) => {
    try {
      const res = await getFile(documentName);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folio}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {}
  };

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Oficios"} />
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
                  <p className="p-3 break-words">No. de Oficio</p>
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
                  <p className="p-3 break-words">Oficio del ciudadano</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -right-2 top-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -right-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -right-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[5px] w-5 border-[#f9b03c] rotate-45 -left-2 bottom-0"></div>
                  <div className="absolute border-t-[5px] w-8 border-[#f9b03c] rotate-45 -left-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[5px] w-12 border-[#f9b03c] rotate-45 -left-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Estatus</p>
                  <div className="border-[4px] border-[#6D1610] absolute inset-y-0 inset-x-0"></div>
                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -left-2 top-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -left-[0.45rem] top-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -left-[0.60rem] top-[0.65rem]"></div>

                  <div className="absolute border-t-[4px] w-5 border-[#f9b03c] -rotate-45 -right-2 bottom-0"></div>
                  <div className="absolute border-t-[4px] w-8 border-[#f9b03c] -rotate-45 -right-[0.45rem] bottom-1"></div>
                  <div className="absolute border-t-[4px] w-12 border-[#f9b03c] -rotate-45 -right-[0.60rem] bottom-[0.65rem]"></div>
                </th>
                <th className="relative overflow-hidden">
                  <p className="p-3 break-words">Oficio con sello</p>
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
            {loading && loadingUpdate ? (
              <tbody>
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filterRequests.map((request, i) => (
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
                        {formatDate(request.folio)}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {formatDate(request.createdAt)}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {`${request.user.firstname} ${request.user.lastname}`}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        {request.user.phonenumber}
                      </th>
                      <th className="border-[2px] rounded-md border-black p-2">
                        <motion.div
                          className="w-full flex self-center"
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            className="bg-[#6d1610] text-white rounded-full font-montserrat text-sm lg:text-xl py-1 px-5 w-full"
                            type="button"
                            onClick={() =>
                              handleDownload(
                                request.document,
                                `${request.folio}_${request.user.firstname} ${request.user.lastname}`
                              )
                            }
                          >
                            Descargar
                          </button>
                        </motion.div>
                      </th>
                      <th className="static">
                        <InputSelect
                          options={options}
                          style={`rounded-md border-[2px] font-sans ${
                            request.status === "Aceptada"
                              ? "bg-[#54CC60]"
                              : request.status === "Rechazada"
                              ? "bg-[#DB4545]"
                              : "bg-[#FFFFFF]"
                          } ${
                            request.documentAccepted !== "" &&
                            request.status === "Aceptada"
                              ? "h-[80px] lg:h-[104px]"
                              : "h-[56px]"
                          }`}
                          onOptionChange={onOptionChange}
                          object={request._id}
                          styleArrow={
                            request.document ? "inset-y-[35%]" : "inset-y-[26%]"
                          }
                          defaultValue={request.status}
                        />
                      </th>
                      <th className="flex flex-col gap-3 border-[2px] rounded-md border-black p-2 min-h-[56px]">
                        {request.documentAcepted !== "" &&
                          request.status === "Aceptada" && (
                            <motion.div
                              className="w-full flex self-center justify-center"
                              whileTap={{ scale: 0.95 }}
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                            >
                              <a
                                href={documentUrl + request.documentAcepted}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#6d1610] text-white rounded-full text-sm lg:text-xl py-1 px-5 w-full"
                              >
                                Visualizar
                              </a>
                            </motion.div>
                          )}
                        <input
                          name="document"
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        {request.status === "Aceptada" && (
                          <motion.div
                            className="w-full flex self-center"
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <button
                              className="bg-[#6d1610] text-white rounded-full font-montserrat text-sm lg:text-xl py-1 px-5 w-full"
                              type="button"
                              onClick={() => handleButtonFile(request._id)}
                            >
                              Cargar
                            </button>
                          </motion.div>
                        )}
                      </th>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-[#EFEFEF]"
      >
        <DialogHeader>
          <div className="w-full bg-[#6D1610] rounded-md font-montserrat font-extrabold text-2xl text-white h-12 text-center flex items-center justify-center relative">
            <p>Confirmación</p>
            <button
              className="absolute right-0 inset-y-0 mt-1"
              onClick={() => handleClickDialog(false)}
            >
              <img
                src={IconoX}
                alt="Icono de la marca X"
                className="w-[70%] lg:w-[80%]"
              />
            </button>
          </div>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-3">
          <p className="font-montserrat font-bold text-xl text-black">
            ¿Deseas agregar un comentario adicional?
          </p>
          <div className="my-2 flex gap-10">
            <button
              type="button"
              className="flex gap-2"
              onClick={() => hanldeClickComments(true)}
            >
              <motion.div
                className="flex items-center justify-center bg-white rounded-full border-black border h-6 w-6"
                animate={
                  inputComments
                    ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }
                    : {}
                }
              >
                <AnimatePresence>
                  {inputComments && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-black rounded-full h-3 w-3"
                    ></motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              Si
            </button>
            <button
              type="button"
              className="flex gap-2"
              onClick={() => hanldeClickComments(false)}
            >
              <motion.div
                className="flex items-center justify-center bg-white rounded-full border-black border h-6 w-6"
                animate={
                  !inputComments
                    ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }
                    : {}
                }
              >
                <AnimatePresence>
                  {!inputComments && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-black rounded-full h-3 w-3"
                    ></motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              No
            </button>
          </div>
          <textarea
            className={`${
              inputComments ? "" : "cursor-default"
            } text-black px-4 py-2 rounded-md border border-black resize-none shadow w-full`}
            placeholder={
              inputComments ? "Comentarios adicionales..." : "Ninguno."
            }
            rows={8}
            onChange={handleChangeTextarea}
            disabled={!inputComments}
            maxLength={500}
          ></textarea>
        </DialogBody>
        <DialogFooter>
          <div className="flex flex-wrap w-full gap-5 justify-between">
            <div className="bg-white border-black border-2 p-1 rounded-full basis-1/3">
              <button
                onClick={() => handleClickDialog(false)}
                className="bg-black text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
                type="submit"
              >
                Cancelar
              </button>
            </div>
            <div className="bg-white border-[#6D1610] border-2 p-1 rounded-full basis-1/3">
              <button
                onClick={() => handleClickDialog(true)}
                className="bg-[#6D1610] text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
                type="submit"
              >
                Aceptar
              </button>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default OPRequestsPage;
