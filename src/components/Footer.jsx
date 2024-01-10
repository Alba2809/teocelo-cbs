import { BiCopyright, BiSolidPhone } from "react-icons/bi";
import { RiMapPin2Fill } from "react-icons/ri";
import LogoVerticalBlanco from "../assets/Logos/LogoVerticalBlanco.png";
import EscudoVerticalP from "../assets/Logos/EscudoVerticalP.svg";
import IconoFacebook from "../assets/Icons/IconoFacebook.png";
import IconoInstagram from "../assets/Icons/IconoInstagram.png";
import Footer1 from "../assets/Extras/Footer1.png"
import Footer2 from "../assets/Extras/Footer2.png"

function Footer() {
  return (
    <div className="flex flex-col pt-10 relative">
      <img src={Footer1} alt="Elemento del footer - 1" className="absolute top-10 left-0 lg:w-80 w-52" />
      <img src={Footer2} alt="Elemento del footer - 2" className="absolute bottom-5 right-0 lg:w-80 w-52" />
      <div className="bg-[#6D1610] grid grid-cols-3 place-items-center p-10 max-h-[400px]">
        <div className="w-full">
          <p className="text-white text-3xl text-center font-extrabold font-serif">
            UBICACIÓN:
          </p>
          <iframe style={{width: "100%", height: "220px", margin: "0", frameborder: "0"}} scrolling="no"  id="gmap_canvas" src="https://maps.google.com/maps?width=721&amp;height=220&amp;hl=en&amp;q=Covarrubias%20s/n,%20Centro,%2091615%20Teocelo,%20Ver.%20Xalapa+(Ayuntamiento%20de%20Teocelo)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='http://maps-generator.com/es'></a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=ca0c11d06024c73ce7c58bbd91af13cc8a5b9f32'></script>
        </div>
        <div className="grid grid-rows-2 shrink-0 gap-8 px-2 lg:px-0 lg:ml-20 font-montserrat">
          <div className="flex items-center justify-start gap-5">
            <RiMapPin2Fill size="2em" style={{ color: "#ffffff" }} />
            <span className="text-white font-bold lg:text-xl">
              Juan Díaz Covarrubias S/N <br />
              Col. Centro <br />
              91615 <br />
              Teocelo, Veracruz, México <br />
            </span>
          </div>
          <div className="flex items-center justify-start gap-5">
            <BiSolidPhone size="2em" style={{ color: "#ffffff" }} />
            <span className="text-white font-bold text-sm lg:text-xl">
              (228)8210007 Ext. 117 <br />
              (228)8210328 Ext. 117
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-5">
          <div className="flex items-center justify-around">
            <img
              src={LogoVerticalBlanco}
              alt="Logo vertical blanco"
              className="w-[40%] lg:max-w-[35%]"
            />
            <img
              src={EscudoVerticalP}
              alt="Logo vertical"
              className="w-[40%] lg:max-w-[25%]"
            />
          </div>
          <div className="text-white font-montserrat text-lg lg:text-3xl font-extrabold text-center">
            H. Ayuntamiento de Teocelo
          </div>
          <div className="flex justify-center gap-10">
            <img
              src={IconoFacebook}
              alt="Icono de Facebook"
              className="w-[30%] lg:w-[15%]"
            />
            <img
              src={IconoInstagram}
              alt="Icono de Instagram"
              className="w-[30%] lg:w-[15%]"
            />
          </div>
        </div>
      </div>
      <div className="grow-0 bg-black flex items-center justify-center">
        <BiCopyright style={{ color: "#ffffff" }} />
        <span className="text-white font-bold text-sm font-serif">
          2022 - 2025 GOBIERNO DE TEOCELO. TODOS LOS DERECHOS RESERVADOS.
        </span>
      </div>
    </div>
  );
}

export default Footer;
