import HeaderTittle from "../components/HeaderTittle";
import { useExtaData } from "../context/ExtraDataContext";

function PrivacyNoticesPage() {
  const { isMobile } = useExtaData();
  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Avisos de privacidad"} />
      <div className="mx-10 mt-16">
        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "grid-cols-2"
          } gap-10 gap-y-10 font-montserrat text-center`}
        >
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Contraloría
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de pivacidad
            </h2>
          </div>
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Presidencia
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral de peticiones
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado de peticiones
            </h2>
          </div>
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Medio ambiente y desarrollo sostenible
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral cafeticultores
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado cafeticultores
            </h2>
          </div>
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Coordinación de programas sociales
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral para apoyos sociales subsidiados
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado para apoyos sociales subsidiados
            </h2>
          </div>
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Desarrollo económico
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral venta de bambú
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado venta de bambú
            </h2>
          </div>
          <div className="shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px]">
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Jurídico
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral asesoría jurídica
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado asesoría jurídica
            </h2>
          </div>
          <div
            className={`shadow-xl border-t-8 border-[#6D1610] flex flex-col min-h-[128px] ${
              isMobile ? "" : "col-span-2 w-1/2 justify-self-center"
            }`}
          >
            <h1 className="text-3xl text-[#6D1610] font-extrabold py-2">
              Transparencia
            </h1>
            <h2 className="text-2xl text-black mx-5 underline">
              Aviso de Privacidad integral solicitud arco
            </h2>
            <h2 className="text-2xl text-black mx-5 underline mt-2">
              Aviso de Privacidad simplificado solicitud arco
            </h2>
            <h2 className="text-2xl text-black mx-5 underline my-2">
              Aviso de Privacidad simplificado solicitudes de información
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyNoticesPage;
