import PalacioNueva from "../assets/Photos/PalacioNueva.jpg";
import IconoPalomita from "../assets/Icons/IconoPalomita.png";
import HeaderTittle from "../components/HeaderTittle";

function MissionVisionPage() {
  return (
    <div>
      <div className="pt-6 mt-5">
        <HeaderTittle title={"H. Ayuntamiento de Teocelo"} />
      </div>
      <div className="px-24 lg:px-40 pt-10 text-justify tracking-wide mb-5 flex flex-col">
        <div className="w-full grid grid-flow-row lg:grid-cols-2 gap-5 bg-[#EFEEEE] p-5 shadow-inner drop-shadow-md">
          <div className="flex flex-col">
            <h1 className="font-extrabold text-[#6D1610] text-4xl">Misión</h1>
            <div className="font-montserrat font-medium text-2xl grow flex items-center">
              <p>
                Administrar con eficacia y eficiencia los recursos captados y
                transferidos al municipio, garantizando transparencia e
                imparcialidad. Nuestra prioridad es brindar servicios de alta
                calidad de manera justa y equitativa, mientras mantenemos una
                administración honesta, inclusiva y dedicada al bienestar de
                todos los ciudadanos. Trabajamos de forma colaborativa e
                integral para mejorar la calidad de vida de nuestros habitantes.
              </p>
            </div>
          </div>
          <img
            src={PalacioNueva}
            alt="Foto del palacio - Nueva"
            className="shadow-md shadow-gray-700"
          />
        </div>
        <div className="w-full grid grid-flow-row lg:grid-cols-2 gap-5 bg-[#EFEEEE] p-5 shadow-inner drop-shadow-md mt-10">
          <img
            src={PalacioNueva}
            alt="Foto del palacio - Nueva"
            className="shadow-md shadow-gray-700"
          />
          <div className="flex flex-col">
            <h1 className="font-extrabold text-[#6D1610] text-4xl">Visión</h1>
            <div className="font-montserrat font-medium text-2xl grow flex items-center">
              <p>
                Construir mediante un gobierno honesto y con la participación
                ciudadana, un municipio seguro, próspero y autosuficiente con
                una administración eficaz que gestione servicios públicos de
                calidad que atiendan las necesidades de su población
                brindándoles oportunidades para el desarrollo, bienestar social
                y mejor calidad de vida.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h1 className="font-extrabold text-2xl lg:text-4xl text-[#6D1610] text-center">
            Valores de la administración
          </h1>
          <p className="text-2xl lg:text-3xl font-medium font-montserrat mt-10 text-justify">
            Se pretende un bienestar integral trabajando en coordinación
            gobierno y sociedad estableciendo valores y principios que
            fortalezcan la relación y nos ayude a mejorar a nuestro municipio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-y-10 lg:gap-y-16 text-xl lg:text-4xl font-extrabold font-montserrat underline mt-16">
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Honestidad</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Tolerancia</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Colaboración</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Integridad</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Igualdad</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Transparencia</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Empatía</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Justicia</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Vocación</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Objetividad</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Respeto</p>
            </div>
            <div className="flex flex-row items-center justify-start">
              <img
                src={IconoPalomita}
                alt="Icono de palomita - Rojo"
                className="w-1/5 lg:w-1/6"
              />
              <p>Entorno cultural y ecológico</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVisionPage;
