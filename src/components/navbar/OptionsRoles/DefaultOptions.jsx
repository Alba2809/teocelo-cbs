import { Link } from "react-router-dom";
import { useExtaData } from "../../../context/ExtraDataContext";
import IconoConstancias from "../../../assets/Icons/IconoConstancias.png";
import IconoQuejas from "../../../assets/Icons/IconoQuejas.png";

function DefaultOptions() {
  const { changeIsLogin, isMobile } = useExtaData();
  return (
    <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} mb-10`}>
      <div
        className={`${
          isMobile ? "grid grid-cols-2" : "flex-col basis-1/3"
        } text-black`}
      >
        <div className="flex items-center gap-3 col-span-2 mb-3 lg:mb-5">
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] lg:min-h-[5em] lg:min-w-[5em] min-h-[4em] min-w-[4em]"></div>
            <img
              src={IconoConstancias}
              alt="Icono de gotas de agua"
              className="absolute top-[18%]"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl">Solicitar</p>
        </div>
        <Link className="flex items-center gap-2 mb-5" to="/water-request">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">
            Conexión de agua o drenaje
          </p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/lamp-request">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">
            Instalación de una lámpara
          </p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/nature-cattle">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">Constancia ganadera</p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/nature-agricultural">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">Constancia agrícola</p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/nature-bamboo">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">
            Guía de traslado de bambú
          </p>
        </Link>
      </div>
      <div
        className={`${
          isMobile ? "grid grid-cols-2" : "flex-col basis-1/3"
        } text-black`}
      >
        <div className="col-span-2 flex items-center gap-3 mb-3 lg:mb-5">
          <div className="relative">
            <div className="rounded-full bg-[#6D1610] lg:min-h-[5em] lg:min-w-[5em] min-h-[4em] min-w-[4em]"></div>
            <img
              src={IconoQuejas}
              alt="Icono de gotas de agua"
              className="absolute top-[18%]"
            />
          </div>
          <p className="font-extrabold text-xl lg:text-2xl">Reportar</p>
        </div>
        <Link className="flex items-center gap-2 mb-5" to="/water-report">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">
            Tubería de agua o drenaje dañada
          </p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/lamp-report">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">Luminaria descompuesta</p>
        </Link>
        <Link className="flex items-center gap-2 mb-5" to="/complaints">
          <div className="min-h-[1.5em] min-w-[1.5em] rounded-full bg-[#F9B03C]"></div>
          <p className="font-bold text-lg lg:text-xl">Servidor público</p>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-2 lg:gap-5">
        <div className="flex justify-center">
          <Link
            to="/loginregister"
            onClick={() => changeIsLogin(true)}
            className="bg-white border-[#6d1610] border-2 p-1 rounded-full"
          >
            <button className="bg-[#6d1610] text-white rounded-full font-montserrat text-2xl lg:text-3xl py-1 px-5">
              Iniciar sesión
            </button>
          </Link>
        </div>
        <div className="w-full px-8">
          <div className="flex items-center">
            <hr className="flex-1 border-t border-[#494848] border" />
            <span className="px-4 text-center font-montserrat font-extrabold text-[#494848]">
              O
            </span>
            <hr className="flex-1 border-t border-[#494848] border" />
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/loginregister"
            onClick={() => changeIsLogin(false)}
            className="bg-white border-[#6d1610] border-2 p-1 rounded-full"
          >
            <button className="bg-[#6d1610] text-white rounded-full font-montserrat text-2xl lg:text-3xl py-1 px-5">
              Registrarme
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DefaultOptions;
