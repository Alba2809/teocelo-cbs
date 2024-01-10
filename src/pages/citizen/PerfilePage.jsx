import { AnimatePresence, motion } from "framer-motion";
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import AlertMessage from "../../components/AlertMessage";
import PrintComponent from "../../components/PrintComponent";
import HeaderTittle from "../../components/HeaderTittle";
import { useExtaData } from "../../context/ExtraDataContext";

function PerfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    getUser,
    getHistory,
    getFile,
    updateUser,
    errors: updateErrors,
  } = useAuth();
  const { expJustLetters, expJustNumbers } = useExtaData();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

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

  const handleDownload = async (documentName, fileName) => {
    try {
      const res = await getFile(documentName);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {}
  };

  const onSubmit = handleSubmit(async (data) => {
    const hasChanges = Object.keys(data).some(
      (key) => data[key] !== userData?.[key]
    );

    if (!hasChanges) return;

    try {
      const res = await updateUser(data);
      if (res) setLoadingUser(true);
    } catch (error) {}
  });

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  const getTitle = (data) => {
    const titleMappings = {
      water: {
        request: "Conexión de agua o drenaje",
        report: "Tubería de agua o drenaje dañada",
      },
      lamp: {
        request: "Instalación de una lámpara",
        report: "Luminaria descompuesta",
      },
      complaint: "Servidor público",
      nature: {
        cattle: "Constancia ganadera",
        agricultural: "Constancia agrícola",
        bamboo: "Guía de traslado de bambú",
      },
      official: "Envío de oficio",
    };

    const titleMapping = titleMappings[data.title];

    if (titleMapping) {
      return typeof titleMapping === "string"
        ? titleMapping
        : titleMapping[data.type || data.typeRequest] || null;
    }

    return null;
  };

  useEffect(() => {
    if (loadingUser || loadingHistory) {
      try {
        async function foundData() {
          const user = await getUser();
          if (user) setUserData(user);

          const history = await getHistory();
          if (history) setUserHistory(history);

          setLoadingUser(false);
          setLoadingHistory(false);
        }
        foundData();
      } catch (error) {}
    }
  }, [loadingUser]);

  return (
    <div className="bg-white pt-6 pb-8 mt-5 font-montserrat">
      <HeaderTittle title={"Perfil"} />
      <div className="m-10 overflow-hidden">
        <AnimatePresence mode="sync">
          {updateErrors.map((error, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, y: -10, opacity: 0 }}
              animate={{ height: 48, y: 0, opacity: 1 }}
              exit={{ height: 0, y: -10, opacity: 0 }}
              transition={{ type: "spring", delay: i * 0.2 }}
            >
              <AlertMessage key={i} message={error} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {loadingUser || !userData ? (
        <div className="px-8 mb-12 h-[490px] lg:h-[172px]">Loading...</div>
      ) : (
        <form className="flex flex-wrap justify-center gap-10 px-8 my-12">
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Nombre(s)</label>
            <div className="relative">
              <input
                type="text"
                className={`border ${
                  errors.firstname ? "border-red-500" : "border-black"
                } py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.firstname}
                {...register("firstname", {
                  required: "Se requiere el nombre",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 25,
                    message: "No debe exceder los 25 caracteres",
                  },
                })}
                maxLength={25}
              />
              <FaRegEdit
                className="absolute right-2 bottom-2 cursor-pointer"
                size="1.6em"
                onClick={onSubmit}
              />
            </div>
            {errors.firstname && (
              <p className="text-red-500 absolute">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Apellidos</label>
            <div className="relative">
              <input
                type="text"
                className={`border ${
                  errors.lastname ? "border-red-500" : "border-black"
                } py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.lastname}
                {...register("lastname", {
                  required: "Se requieren los apellidos",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 25,
                    message: "No debe exceder los 25 caracteres",
                  },
                })}
                maxLength={25}
              />
              <FaRegEdit
                className="absolute right-2 bottom-2 cursor-pointer"
                size="1.6em"
                onClick={onSubmit}
              />
            </div>
            {errors.lastname && (
              <p className="text-red-500 absolute">{errors.lastname.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Telefono</label>
            <div className="relative">
              <input
                type="text"
                className={`border ${
                  errors.phonenumber ? "border-red-500" : "border-black"
                } py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.phonenumber ?? ""}
                {...register("phonenumber", {
                  required: "Se requiere el número de teléfono",
                  pattern: {
                    value: expJustNumbers,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 10,
                    message: "Debe tener 10 dígitos",
                  },
                  minLength: {
                    value: 10,
                    message: "Debe tener 10 dígitos",
                  },
                })}
                maxLength={10}
                minLength={10}
              />
              <FaRegEdit
                className="absolute right-2 bottom-2 cursor-pointer"
                size="1.6em"
                onClick={onSubmit}
              />
            </div>
            {errors.phonenumber && (
              <p className="text-red-500 absolute">
                {errors.phonenumber.message}
              </p>
            )}
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Correo electrónico</label>
            <div className="relative">
              <input
                type="email"
                className={`border ${
                  errors.email ? "border-red-500" : "border-black"
                } py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.email}
                {...register("email", {
                  required: "Se requiere el correo electrónico",
                  maxLength: {
                    value: 50,
                    message: "No debe exceder los 50 caracteres",
                  },
                })}
                maxLength={50}
              />
              <FaRegEdit
                className="absolute right-2 bottom-2 cursor-pointer"
                size="1.6em"
                onClick={onSubmit}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 absolute">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%]">
            <label className="font-bold text-xl">Contraseña</label>
            <input
              type="password"
              className="border border-black py-2 pl-4 pr-12 w-full rounded-md"
              defaultValue={12345678910}
              disabled
            />
          </div>
        </form>
      )}

      <div className="w-full px-8">
        <div className="flex items-center my-5">
          <hr className="flex-1 border-t border-black border" />
          <p className="px-4 text-center font-bold text-black text-2xl">
            Historial
          </p>
          <hr className="flex-1 border-t border-black border" />
        </div>
        <div className="w-full bg-[#EFEEEE] rounded-xl p-2">

        <div className="w-full border border-black h-[600px] overflow-auto">
          <table className="w-full table-fixed min-w-[1400px]">
            <thead className="bg-[#6D1610] text-center text-xl text-white h-16 font-bold sticky top-0">
              <tr>
                <th>Trámite o servicio</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Comentarios</th>
                <th>Documentos expedidos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2">
              {loadingHistory || !userHistory ? (
                <tr>
                  <td colSpan="5" className="p-2">
                    Loading...
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {userHistory.map((data, i) => (
                    <motion.tr
                      layout
                      key={i}
                      className="text-lg divide-x-2 h-28"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", delay: i * 0.2 }}
                    >
                      <th className="px-2">{getTitle(data) ?? "Error"}</th>
                      <th className="px-2">{formatDate(data.createdAt)}</th>
                      <th
                        className={`px-2 ${
                          data.status === "Aceptada"
                            ? "bg-[#54CC60]"
                            : data.status === "Rechazada"
                            ? "bg-[#DB4545]"
                            : "bg-white"
                        }`}
                      >
                        {data.status ?? "Entregada"}
                      </th>
                      <th className="px-2">
                        <input
                          type="text"
                          defaultValue={
                            !data.commentsEmployee ||
                            data.commentsEmployee === ""
                              ? "Ninguno."
                              : data.commentsEmployee
                          }
                          className={`w-full h-full outline-none ${
                            !data.commentsEmployee ||
                            data.commentsEmployee === "Ninguno."
                              ? "text-center"
                              : ""
                          }`}
                          readOnly
                        />
                      </th>
                      <th className="px-2">
                        {data.title === "complaint" ? (
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
                        ) : (
                          <>
                            {data.title === "water" &&
                            data.type === "request" &&
                            data.status === "Aceptada" &&
                            data.document !== "" ? (
                              <motion.div
                                className="w-full flex"
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full">
                                  <button
                                    className="bg-[#6d1610] text-white rounded-full font-montserrat text-base lg:text-3xl py-1 px-1 lg:px-5 w-full"
                                    type="button"
                                    onClick={() =>
                                      handleDownload(
                                        data.document,
                                        `{userData.firstname} ${userData.lastname}`
                                      )
                                    }
                                  >
                                    Descargar
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <>
                                {data.title === "official" &&
                                data.status === "Aceptada" &&
                                data.documentAccepted !== "" ? (
                                  <motion.div
                                    className="w-full flex"
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <div className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full">
                                      <button
                                        className="bg-[#6d1610] text-white rounded-full font-montserrat text-base lg:text-3xl py-1 px-1 lg:px-5 w-full"
                                        type="button"
                                        onClick={() =>
                                          handleDownload(
                                            data.documentAccepted,
                                            `${data.folio}_${userData.firstname} ${userData.lastname}`
                                          )
                                        }
                                      >
                                        Descargar
                                      </button>
                                    </div>
                                  </motion.div>
                                ) : (
                                  "No aplica"
                                )}
                              </>
                            )}
                          </>
                        )}
                      </th>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
              <tr></tr>
            </tbody>
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

export default PerfilePage;
