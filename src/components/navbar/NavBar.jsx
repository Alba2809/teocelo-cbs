import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Drawer,
  List,
  ThemeProvider,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaCheck, FaRegEye } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { useExtaData } from "../../context/ExtraDataContext";
import { useAuth } from "../../context/AuthContext";
import { useCounter } from "../../context/CounterContext";
import { AnimatePresence, motion } from "framer-motion";
import LogoHorizontal from "../../assets/Logos/LogoHorizontal.png";
import EscudoVertical from "../../assets/Logos/EscudoVertical.png";
import IconoX from "../../assets/Icons/IconoX.png";
import BtnMeGustaria from "../../assets/Extras/BtnMeGustaria.png";
import NavBarOptions from "./NavBarOptions";
import NavBarOptionsMobileVersion from "./NavBarOptionsMobileVersion";
import SCOptions from "./OptionsRoles/SCOptions";
import CitizenOptions from "./OptionsRoles/CitizenOptions";
import DefaultOptions from "./OptionsRoles/DefaultOptions";
import SLOptions from "./OptionsRoles/SLOptions";
import Footer from "../Footer";
import DWOptions from "./OptionsRoles/DWOptions";
import ESOptions from "./OptionsRoles/ESOptions";
import CSOptions from "./OptionsRoles/CSOptions";
import OPOptions from "./OptionsRoles/OPOptions";
import SPOptions from "./OptionsRoles/SPOptions";
import DialogMessage from "../DialogMessage";
import "../../styles/PulseAnimation.css";
import "../../styles/IconUserLogin.css";

function NavBar() {
  const { isMobile } = useExtaData();
  const { isAuthenticated, logout, getUser } = useAuth();
  const { counterVisits } = useCounter();
  const [user, setUser] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

  const [openDialogSystem, setOpenDialogSystem] = useState(false);
  const handleOpenDialogSystem = () => setOpenDialogSystem(!openDialogSystem);
  const handleCloseDialogSystem = () => {
    handleOpenDialogSystem();
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  const handleLogout = () => {
    logout();
    handleOpenDialog();
  };

  const themeDrawer = {
    drawer: {
      defaultProps: {
        size: 300,
        overlay: true,
        placement: "left",
        overlayProps: undefined,
        className: "",
        dismiss: undefined,
        onClose: undefined,
        transition: {
          type: "tween",
          duration: 0.3,
        },
      },
      styles: {
        base: {
          drawer: {
            position: "fixed",
            zIndex: "z-[9999]",
            pointerEvents: "pointer-events-auto",
            backgroundColor: "bg-white",
            boxSizing: "box-border",
            width: "w-full",
            boxShadow: "shadow-2xl shadow-blue-gray-900/10",
          },
          overlay: {
            position: "fixed",
            inset: "inset-0",
            width: "w-full",
            height: "h-screen",
            pointerEvents: "pointer-events-auto",
            zIndex: "z-[9995]",
            backgroundColor: "bg-black",
            backgroundOpacity: "bg-opacity-60",
            backdropBlur: "backdrop-blur-sm",
          },
        },
      },
    },
  };

  const getUserData = async () => {
    if (!isAuthenticated) return handleOpenDialog();
    try {
      const res = await getUser();
      setUser(res);
      handleOpenDialog();
    } catch (error) {}
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await getUser();
        setUser(res);
      } catch (error) {}
    }
    getData();
  }, []);

  return (
    <div>
      <ThemeProvider value={themeDrawer}>
        <div className="flex bg-[#6D1610] font-montserrat text-xs text-white w-full h-8 items-center justify-center">
          <p>GOBIERNO DE TEOCELO 2022 - 2025</p>
        </div>
        <div
          className={`grid gap-0 ${
            isMobile ? "grid-cols-1 justify-items-center" : "grid-cols-2"
          }`}
        >
          <div className="flex">
            <img
              src={EscudoVertical}
              alt="Imagen vertical"
              className="ml-5 mr-16 my-5 h-20"
            />
            <img
              src={LogoHorizontal}
              alt="Imagen horizontal"
              className="my-5 h-20"
            />
          </div>
          {!isMobile && (
            <div className="flex items-center justify-end">
              <motion.img
                whileTap={{ scale: 0.95 }}
                src={BtnMeGustaria}
                onClick={getUserData}
                className="w-[170px] mr-5 mt-3 cursor-pointer"
              />
              <div className="flex items-center mr-[5%]">
                <div className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]">
                  <div
                    className={
                      isAuthenticated
                        ? "user-icon-home-login"
                        : "user-icon-home-logout"
                    }
                  ></div>
                  <div
                    className={
                      isAuthenticated
                        ? "user-icon-home-login-mark p-1"
                        : "user-icon-home-logout-mark p-1"
                    }
                  >
                    {isAuthenticated ? (
                      <FaCheck color="white" />
                    ) : (
                      <FaXmark color="white" />
                    )}
                  </div>
                </div>
                <AnimatePresence mode="popLayout">
                  {isAuthenticated && (
                    <motion.p
                      layout
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 100, opacity: 0 }}
                      className="ml-5 font-extrabold text-black text-xl text-center"
                    >
                      {user.firstname}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <div className="sticky top-0 z-[9998]">
          {isMobile ? (
            <>
              <div className="w-full h-10 flex items-center justify-center bg-[#efeeee] shadow-lg">
                <BiMenu
                  onClick={showDrawer}
                  className="cursor-pointer"
                  size="2em"
                />
              </div>
              <Drawer open={openDrawer} onClose={closeDrawer} className="p-4">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]">
                      <div
                        className={
                          isAuthenticated
                            ? "user-icon-home-login"
                            : "user-icon-home-logout"
                        }
                      ></div>
                      <div
                        className={
                          isAuthenticated
                            ? "user-icon-home-login-mark p-[2px]"
                            : "user-icon-home-logout-mark p-[2px]"
                        }
                      >
                        {isAuthenticated ? (
                          <FaCheck color="white" />
                        ) : (
                          <FaXmark color="white" />
                        )}
                      </div>
                    </div>
                    <AnimatePresence mode="popLayout">
                      {isAuthenticated && (
                        <motion.p
                          layout
                          initial={{ x: 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 100, opacity: 0 }}
                          className="ml-5 font-extrabold text-black text-xl text-center"
                        >
                          {user.firstname}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <FaXmark className="cursor-pointer" onClick={closeDrawer} />
                </div>
                <div className="grid grid-cols-1 items-center justify-center">
                  <motion.img
                    whileTap={{ scale: 0.95 }}
                    src={BtnMeGustaria}
                    onClick={getUserData}
                    className="w-[70%] mr-5 mt-3 justify-self-center"
                  />
                </div>
                <div className="mb-8 pr-4 mt-10">
                  <List>
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "INICIO",
                        others: {
                          INICIO: "/",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "TEOCELO",
                        others: {
                          Historia: "/history",
                          "Escudo de armas": "/coat-of-arms",
                          "Acontecimientos históricos": "/historical-events",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "GOBIERNO MUNICIPAL",
                        others: {
                          "Misión y visión": "/mission-and-vision",
                          Organigrama:
                            "https://drive.google.com/file/d/1ug0zaMZGgvX3e79qur7hQSvDF17qJ-jr/view?usp=sharing",
                          "H. Cabildo": "/h-cabildo",
                          "Códigos de ética": "/codes-ethics",
                          "Códigos de conducta": "/codes-conduct",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "DIRECTORIO",
                        others: {
                          DIRECTORIO: "/municipal-directory",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "TRANSPARENCIA",
                        others: {
                          "Acta circunstanciada de entrega y recepción":
                            "/circumstantial-act",
                          "Convenio DECLARANET": "/declaranet-convention",
                          "Avisos de privacidad": "/privacy-notices",
                          "Plan Municipal de Desarrollo 2022 - 2025":
                            "/pmd-teocelo",
                          "Programa Anual de Evaluación 2023": "/pae-teocelo",
                          "Evaluación de desempeño FISM": "/fism-evaluation",
                          "Evaluación de desempeño FORTAMUN":
                            "/fortamun-evaluation",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "TURISMO",
                        others: {
                          TURISMO: "/tourism",
                        },
                      }}
                    />
                    <NavBarOptionsMobileVersion
                      options={{
                        title: "MEJORA REGULATORIA",
                        others: {
                          INICIO: "/procedures-and-services",
                        },
                      }}
                    />
                  </List>
                </div>
              </Drawer>
            </>
          ) : (
            <>
              <div className="w-full h-10 flex items-center justify-center bg-[#efeeee] shadow-lg">
                <NavBarOptions
                  options={{
                    title: "INICIO",
                    others: {
                      INICIO: "/",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "TEOCELO",
                    others: {
                      Historia: "/history",
                      "Escudo de armas": "/coat-of-arms",
                      "Acontecimientos históricos": "/historical-events",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "GOBIERNO MUNICIPAL",
                    others: {
                      "Misión y visión": "/mission-and-vision",
                      Organigrama:
                        "https://drive.google.com/file/d/1ug0zaMZGgvX3e79qur7hQSvDF17qJ-jr/view?usp=sharing",
                      "H. Cabildo": "/h-cabildo",
                      "Códigos de ética": "/codes-ethics",
                      "Códigos de conducta": "/codes-conduct",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "DIRECTORIO",
                    others: {
                      DIRECTORIO: "/municipal-directory",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "TRANSPARENCIA",
                    others: {
                      "Acta circunstanciada de entrega y recepción":
                        "/circumstantial-act",
                      "Convenio DECLARANET": "/declaranet-convention",
                      "Avisos de privacidad": "/privacy-notices",
                      "Plan Municipal de Desarrollo 2022 - 2025":
                        "/pmd-teocelo",
                      "Programa Anual de Evaluación 2023": "/pae-teocelo",
                      "Evaluación de desempeño FISM": "/fism-evaluation",
                      "Evaluación de desempeño FORTAMUN":
                        "/fortamun-evaluation",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "TURISMO",
                    others: {
                      TURISMO: "/tourism",
                    },
                  }}
                />
                <div className="border-r-2 border-[#6D1610] h-[90%]"></div>
                <NavBarOptions
                  options={{
                    title: "MEJORA REGULATORIA",
                    others: {
                      INICIO: "/procedures-and-services",
                    },
                  }}
                />
              </div>
            </>
          )}
        </div>

        <>
          <Dialog
            open={openDialog}
            handler={handleOpenDialog}
            size="lg"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>
              <div className="grid grid-cols-2 rounded-lg bg-[#6D1610] w-full h-12 lg:h-16 items-center text-white">
                <div className="justify-self-start ml-5 font-montserrat text-2xl lg:text-3xl">
                  Me gustaría...
                </div>
                <button
                  className="justify-self-end mr-5 mt-2"
                  onClick={handleOpenDialog}
                >
                  <img
                    src={IconoX}
                    alt="Icono de la marca X"
                    className="w-[70%] lg:w-[80%]"
                  />
                </button>
              </div>
            </DialogHeader>
            <DialogBody>
              {isAuthenticated ? (
                <>
                  {user.role?.name ===
                    "employee.sc" /* Comunicación social */ && (
                    <>
                      <SCOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name ===
                    "employee.sl" /* Alumbrado público */ && (
                    <>
                      <SLOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name === "employee.dw" /* Agua potable */ && (
                    <>
                      <DWOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name === "employee.es" /* Medio ambiente */ && (
                    <>
                      <ESOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name === "employee.cs" /* Contraloría */ && (
                    <>
                      <CSOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name ===
                    "employee.op" /* Oficialía de partes */ && (
                    <>
                      <OPOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name ===
                    "employee.sp" /* Fomento deportivo */ && (
                    <>
                      <SPOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                  {user.role?.name === "citizen" && (
                    <>
                      <CitizenOptions
                        handleLogout={handleLogout}
                        userName={user?.firstname + " " + user?.lastname}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  <DefaultOptions />
                </>
              )}
            </DialogBody>
            <DialogFooter>
              <img
                src={LogoHorizontal}
                alt="Logo horizontal"
                className="w-1/3 lg:w-1/5 mb-16 absolute z-[50] -bottom-14 right-4"
              />
            </DialogFooter>
          </Dialog>
        </>
      </ThemeProvider>

      <div className="overflow-hidden">
        <motion.div
          initial={{ x: -window.innerWidth }}
          animate={{ x: 0 }}
          exit={{ x: window.innerWidth }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
          <Footer />
          <button
            className="fixed bottom-5 right-5 w-14 h-14 bg-[#b43930] rounded-full text-white z-[9999] pulse text-4xl font-extrabold font-montserrat"
            onClick={handleOpenDialogSystem}
          >
            !
          </button>
          <div className="fixed bottom-32 right-5 w-14 h-14 bg-[#b43930] rounded-full text-white z-[9998] pulse font-extrabold font-montserrat flex items-center justify-center">
            <Tooltip className="z-[9999]" content={`Visitas: ${counterVisits}`} placement="left">
              <button>
                <FaRegEye size="1.8em" />
              </button>
            </Tooltip>
          </div>
        </motion.div>
      </div>
      <DialogMessage
        buttonCancel={false}
        handleOpen={handleOpenDialogSystem}
        title="¡Aviso importante!"
        message={
          <div>
            Este sistema web es una versión de prueba y no cuenta con estatus
            oficial. Su implementación ha sido autorizada por el H. Ayuntamiento
            de Teocelo exclusivamente para propósitos de prueba y evaluación.
            <br />
            <br />
            Por favor, tenga en cuenta que cualquier solicitud, reporte o acción
            realizada a través de este sistema no tendrá validez oficial. Se le
            invita a dirigirse a los canales habituales de comunicación con el
            H. Ayuntamiento para cualquier asunto oficial.
            <br />
            <br />
            Agradecemos su comprensión y colaboración durante esta fase de
            prueba.
          </div>
        }
        handleAction={handleCloseDialogSystem}
        open={openDialogSystem}
      />
    </div>
  );
}

export default NavBar;
