import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useExtaData } from "../../../context/ExtraDataContext";
import IconoAgricola from "../../../assets/Icons/IconoAgricola.png";
import IconoGanadera from "../../../assets/Icons/IconoGanadera.png";
import IconoBambu from "../../../assets/Icons/IconoBambu.png";
import "../../../styles/IconUserLogin.css";

function ESOptions({ handleLogout, userName }) {
  const { isMobile } = useExtaData();
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} mb-10`}>
      <div className="col-span-2 flex flex-wrap items-start gap-y-5">
        <Link to="/es-cattle" className="lg:basis-1/2 flex items-center gap-2">
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] max-h-[7em] max-w-[7em] min-h-[6em] min-w-[6em]"></div>
            <img
              src={IconoGanadera}
              alt="Icono de ganadería"
              className="absolute top-[15%] p-[0.5rem] ml-1"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl text-black">
            Constancias de acreditación ganadera
          </p>
        </Link>
        <Link
          to="/es-agricultural"
          className="lg:basis-1/2 flex items-center gap-2"
        >
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] max-h-[7em] max-w-[7em] min-h-[6em] min-w-[6em]"></div>
            <img
              src={IconoAgricola}
              alt="Icono de agricultura"
              className="absolute top-[15%] p-[0.2rem] mt-1"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl text-black">
            Constancias agrícolas
          </p>
        </Link>
        <Link to="/es-bamboo" className="lg:basis-1/2 flex items-center gap-2">
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] max-h-[7em] max-w-[7em] min-h-[6em] min-w-[6em]"></div>
            <img
              src={IconoBambu}
              alt="Icono de bambú"
              className="absolute top-[15%]"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl text-black">
            Guías de traslado de bambú
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
          <p className="font-extrabold text-black text-xl text-center">
            {userName}
          </p>
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

export default ESOptions;
