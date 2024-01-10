import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useExtaData } from "../../../context/ExtraDataContext";
import IconoReportes from "../../../assets/Icons/IconoReportes.png";
import IconoSolicitudes from "../../../assets/Icons/IconoSolicitudes.png";
import "../../../styles/IconUserLogin.css";

function SLOptions({ handleLogout, userName }) {
  const { isMobile } = useExtaData();
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} mb-10`}>
      <div className="col-span-2 flex flex-wrap items-start gap-y-5">
        <Link
          to="/sl-requests"
          className="lg:basis-1/2 flex items-center gap-2"
        >
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] max-h-[7em] max-w-[7em] min-h-[5em] min-w-[5em]"></div>
            <img
              src={IconoSolicitudes}
              alt="Icono de solicitudes"
              className="absolute top-[15%] p-[0.15rem] ml-1"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl text-black">
            Solicitudes
          </p>
        </Link>
        <Link to="/sl-reports" className="lg:basis-1/2 flex items-center gap-2">
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] max-h-[7em] max-w-[7em] min-h-[5em] min-w-[5em]"></div>
            <img
              src={IconoReportes}
              alt="Icono de reportes"
              className="absolute top-[15%] p-[0.15rem]"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl text-black">
            Reportes
          </p>
        </Link>
      </div>
      <div
        className={`flex flex-col items-center ${
          isMobile ? "col-span-2 mt-5" : ""
        } gap-5`}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-[100px] h-[100px] lg:w-[140px] lg:h-[140px]">
            <div className="user-icon"></div>
            <div className="user-icon-mark">
              <FaCheck size={isMobile ? "1.5em" : "2em"} color="white" />
            </div>
          </div>
          <p className="font-extrabold text-black text-xl text-center">{userName}</p>
        </div>
        <Link
          to="/"
          onClick={handleLogoutClick}
          className={`bg-white border-[#6d1610] border-2 p-1 rounded-full ${
            isMobile ? "w-1/2" : "w-2/3"
          }`}
        >
          <button className="bg-[#6d1610] text-white rounded-full font-montserrat text-2xl lg:text-3xl py-1 px-5 w-full">
            Cerrar sesión
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SLOptions;
