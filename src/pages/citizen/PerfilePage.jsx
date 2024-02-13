import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintComponent from "../../components/PrintComponent";
import HeaderTittle from "../../components/HeaderTittle";

function PerfilePage() {
  const {
    getUser,
    getHistory,
    getFile,
  } = useAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  const printComponentRefs = useRef();
  const [dataSelected, setDataSelected] = useState(null);

  const handlePrint = (data) => setDataSelected(data);

  const print = useReactToPrint({
    content: () => printComponentRefs.current,
    onPrintError: () =>
      alert(
        "Hubo un error al tratar de descargar el archivo. Inténtelo de nuevo o inténtelo más tarde."
      ),
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
      {loadingUser || !userData ? (
        <div className="px-8 mb-12 h-[490px] lg:h-[172px]">Loading...</div>
      ) : (
        <form className="flex flex-wrap justify-center gap-10 px-8 my-12">
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Nombre(s)</label>
            <div className="relative">
              <input
                type="text"
                className={`border border-black py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.firstname}
                maxLength={25}
                disabled
              />
            </div>
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Apellidos</label>
            <div className="relative">
              <input
                type="text"
                className={`border border-black py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.lastname}
                maxLength={25}
                disabled
              />
            </div>
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Teléfono</label>
            <div className="relative">
              <input
                type="text"
                className={`border border-black py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.phonenumber ?? ""}
                maxLength={10}
                minLength={10}
                disabled
              />
            </div>
          </div>
          <div className="w-full lg:w-[30%] relative">
            <label className="font-bold text-xl">Correo electrónico</label>
            <div className="relative">
              <input
                type="email"
                className={`border border-black py-2 pl-4 pr-12 w-full rounded-md`}
                defaultValue={userData.email}
                maxLength={50}
                disabled
              />
            </div>
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
                              : data.status === "Atendido"
                              ? "bg-[#54CC60]"
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
                                          `${userData.firstname} ${userData.lastname}`
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
