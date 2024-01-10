import EscudoVerticalP from "../assets/Logos/EscudoVerticalP.svg";
import HeaderTittle from "../components/HeaderTittle";

function CoatArmsPage() {
  return (
    <div>
      <div className="bg-[#efeeee] pt-6 pb-8 mt-5 shadow-lg shadow[#c0c0c0]">
        <HeaderTittle title={"Escudo de armas - Teocelo, Veracruz"} />
        <div className="w-full">
          <div className="flex items-center justify-center mt-5">
            <img
              src={EscudoVerticalP}
              alt="Logo del escudo de Teocelo"
              className="w-[20em] lg:w-[30em]"
            />
          </div>
        </div>
      </div>
      <div className="px-40 lg:px-72 pt-10 text-justify tracking-wide font-normal text-xl leading-loose font-montserrat">
        <h1 className="text-center font-extrabold text-2xl mb-5 mx-5">
          En sesión de Cabildo del 23 de septiembre de 1991 se aprobó el Escudo
          de Armas para Teocelo.
        </h1>
        <article>
          <p>
            Escudo semicircular, cuartelado en cruz típico de la influencia
            española, con campos de azul, este color simboliza la justicia, el
            celo en el deber, la verdad, la lealtad, la caridad.
          </p>
          <p className="mt-5">
            En el primer campo o cuartel se representa la pirámide del sol y la
            luna, significando a los hombres y las mujeres de esta tierra,
            coronada por una cruz latina dorada, este color simboliza la nobleza
            y la magnanimidad en este caso que en su conjunto representa la
            fusión de dos culturas la mexicana y la europea.
          </p>
          <p className="mt-5">
            En el segundo campo o cuartel se representa la seguridad del pueblo
            con los centinelas que custodian la región: El Cofre de Perote y el
            Pico de Orizaba, además de lo agradable del lugar, en sus colores
            naturales; verde claro y verde oscuro, significando la esperanza de
            los pueblos; en la parte superior cuatro nubes blancas detenidas en
            el azul del cielo representan la tranquilidad y quietud del pueblo.
          </p>
          <div>
            <p className="mt-5">
              En el tercer campo o cuartel se representa la fertilidad de su
              suelo virgen con una flor, Oceloxochitl; símbolo de la flora, y es
              la flor representativa de Teocelo, dicha representación es en
              color naranja y negro, los colores del ocelote.
            </p>
            <p className="mt-5">
              En el cuarto campo o cuartel, y siguiendo la simetría del
              semicírculo, las cinco estrellas prehispánicas de Venus, que
              representan el clima agradable la mayor parte del tiempo; es decir
              en buen clima.
            </p>
            <p className="mt-5">
              El soporte es un OCELOTE, símbolo de Teocelo, tomado de antiguos
              códices y del calendario Azteca y se representa en sus colores
              característicos; El volante en Cikir riji (este es un color que
              significa la valentía de los habitantes del lugar), es rojo con el
              nombre de TEOCELO.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default CoatArmsPage;
