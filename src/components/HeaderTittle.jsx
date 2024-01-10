import Encabezado1 from "../assets/Extras/Encabezado1.png";
import Encabezado2 from "../assets/Extras/Encabezado2.png";

function HeaderTittle({ title }) {
  return (
    <div className="w-full h-14 text-white font-extrabold text-2xl lg:text-4xl flex items-center">
      <img
        src={Encabezado2}
        alt="Elemento de encabezado - 2"
        className="w-[22%] h-full self-start"
      />
      <div className="w-full bg-[#6D1610] h-full flex items-center justify-center">
        <p className="text-center">{title}</p>
      </div>
      <img
        src={Encabezado1}
        alt="Elemento de encabezado - 1"
        className="w-[22%] h-full self-end"
      />
    </div>
  );
}

export default HeaderTittle;
