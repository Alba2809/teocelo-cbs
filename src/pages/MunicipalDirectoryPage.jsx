import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { useExtaData } from "../context/ExtraDataContext";
import { LuSearch } from "react-icons/lu";
import { FiAlertCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import HeaderTittle from "../components/HeaderTittle";

function MunicipalDirectoryPage() {
  const { isMobile } = useExtaData();
  const personal = [
    {
      area: "Presidencia",
      name: "Lic. Isaac Alberto Anell Reyes",
      ubication: {
        place: "Palacio municipal",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 117", "(228)8210328 Ext. 117"],
    },
    {
      area: "Sindicatura",
      name: "C. Daniela Villegas Olmos",
      ubication: {
        place: "Palacio municipal",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 125", "(228)8210328 Ext. 125"],
    },
    {
      area: "Regiduría",
      name: "Lic. Gloria Águeda García García",
      ubication: {
        place: "Palacio municipal",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 124", "(228)8210328 Ext. 124"],
    },
    {
      area: "Secretaría",
      name: "L.A.E. José Ramón Vega Andrade",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 126", "(228)8210328 Ext. 126"],
    },
    {
      area: "Archivo Municipal",
      name: "C. Ada Alicia Tlaxcalteco Andrade",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 118", "(228)8210328 Ext. 118"],
    },
    {
      area: "Órgano De Control Interno",
      name: "L.A.E. Jaqueline Fuentes Valdivia",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 111", "(228)8210328 Ext. 111"],
    },
    {
      area: "Tesorería",
      name: "L.C.P. José Pablo Rosado Molina",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 105", "(228)8210328 Ext. 105"],
    },
    {
      area: "Catastro",
      name: "C.P. José Bernardino Valdivia López",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 113", "(228)8210328 Ext. 113"],
    },
    {
      area: "Unidad Jurídica",
      name: "Lic. Rommel Caín Chacan Pale",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 109", "(228)8210328 Ext. 109"],
    },
    {
      area: "Coordinación de Programas Sociales",
      name: "Pendiente",
      ubication: {
        place: "Instalaciones Del DIF Municipal",
        street: "Calle San Pedro S/N",
        neighborhood: "Barrio De San Pedro",
        cp: "C.P. 91615",
      },
    },
    {
      area: "Informática",
      name: "L.S.C.A. Carlos Arturo Valdivia Arcos",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
    },
    {
      area: "Unidad De Transparencia",
      name: "L.R.I. José Julián Morales Andrade",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 112", "(228)8210328 Ext. 112"],
    },
    {
      area: "Registro Civil",
      name: "T.S.U. Zayra Vanessa García Bustos",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 104", "(228)8210328 Ext. 104"],
    },
    {
      area: "Oficialía Mayor",
      name: "C. Gustavo Andrade López",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 108", "(228)8210328 Ext. 108"],
    },
    {
      area: "Oficialía De Partes",
      name: "Pendiente",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 101", "(228)8210328 Ext. 101"],
    },
    {
      area: "Rastro Municipal",
      name: "C. Clemente Cosme Caricio",
      ubication: {
        street: "Calle San Pedro S/N",
        neighborhood: "Barrio De San Pedro",
        cp: "C.P. 91615",
      },
    },
    {
      area: "Dirección De Obras Públicas",
      name: "Ing. Jesús Rafael Sánchez Sánchez",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 128", "(228)8210328 Ext. 128"],
    },
    {
      area: "Fomento Deportivo Y DIMJUVE",
      name: "L.E. José Alberto Reyes Izaguirre",
      ubication: {
        place: "Palacio Municipal",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 120", "(228)8210328 Ext. 120"],
    },
    {
      area: "Dirección De Desarrollo Económico",
      name: "L.S. José De Jesús Mora Hernández",
      ubication: {
        place: "Palacio Municipal",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 129", "(228)8210328 Ext. 129"],
    },
    {
      area: "Comercio",
      name: "C. José Luis Tapia Olmos",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
    },
    {
      area: "Dirección De Medio Ambiente Y Desarrollo Sostenible",
      name: "Biol. Eduardo Méndez Sánchez",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 119", "(228)8210328 Ext. 119"],
    },
    {
      area: "Dirección De Educación, Cultura Y Deporte",
      name: "L.H. Octaviano Alarcón Sánchez",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 114", "(228)8210328 Ext. 114"],
    },
    {
      area: "Dirección De Agua Potable Y Saneamiento",
      name: "C. Francisco Antonio Sánchez Retureta",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 116", "(228)8210328 Ext. 116"],
    },
    {
      area: "Turismo",
      name: "L.A.E.T Daniel Andrés Morales Pérez",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
    },
    {
      area: "DIF Municipal",
      name: "L.E.P. Zayra Larios Alducin",
      ubication: {
        place: "Instalaciones Del DIF Municipal",
        street: "Calle San Pedro",
        neighborhood: "Barrio De San Pedro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)2016930"],
    },
    {
      area: "Dirección De Protección Civil",
      name: "C. Gabriel Galván Anell",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 103", "(228)8210328 Ext. 103"],
    },
    {
      area: "Dirección De Seguridad Pública",
      name: "C. Taurino Enrique Landa Luna",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Baja",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 102", "(228)8210328 Ext. 102"],
    },
    {
      area: "Instituto Municipal De La Mujer",
      name: "Lic. Alejandra Pelayo Trujillo",
      ubication: {
        street: "Calle Independencia Oriente #54",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 117", "(228)8210328 Ext. 117"],
    },
    {
      area: "Dirección De Comunicación Social",
      name: "Lic. Daniel Alexis Mendoza Valdivia",
      ubication: {
        place: "Edificio del H. Ayuntamiento",
        floor: "Planta Alta",
        street: "Calle Juan Díaz Covarrubias S/N",
        neighborhood: "Col. Centro",
        cp: "C.P. 91615",
      },
      contacts: ["(228)8210007 Ext. 127", "(228)8210328 Ext. 127"],
    },
  ];

  const sortByArea = (data) => {
    const priorityAreas = ["Presidencia", "Sindicatura", "Regiduría"];
  
    return [...data].sort((a, b) => {
      const indexA = priorityAreas.indexOf(a.area);
      const indexB = priorityAreas.indexOf(b.area);
  
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
  
      if (indexA !== -1) {
        return -1;
      }
  
      if (indexB !== -1) {
        return 1;
      }
  
      return a.area.localeCompare(b.area);
    });
  };

  const [showPersonal, setShowPersonal] = useState(personal);

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchPersonal();
    }
  };

  const handleSearchPersonal = () => {
    const inputValueFixed = inputValue.trimStart();
    if (inputValueFixed != "") {
      const refreshPersonal = personal.filter(
        (person) =>
          person.area.toUpperCase().includes(inputValueFixed.toUpperCase()) ||
          person.name.toUpperCase().includes(inputValueFixed.toUpperCase())
      );

      return setShowPersonal(refreshPersonal);
    }

    setShowPersonal(personal);
  };

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Directorio Municipal"} />
      <div className="mx-10">
        <div className="flex flex-row-reverse mt-5 mr-5">
          <div className="relative ml-14 w-[23rem]">
            <input
              type="text"
              placeholder="¿A qué área o persona estás buscando?"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              name="searchValue"
              className="w-full text-black pr-10 pl-2 py-2 rounded-lg border-[3px] border-[#6D1610] bg-white block placeholder-black font-montserrat"
            />
            <div className="absolute inset-y-0 right-0 px-[0.40rem] m-[0.5rem] flex items-center text-sm leading-5 bg-[#6D1610] rounded-md cursor-pointer">
              <LuSearch
                size="1.5em"
                style={{ color: "#ffffff" }}
                onClick={handleSearchPersonal}
              />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap gap-5 justify-center font-montserrat mt-10`}
        >
          {showPersonal.length > 0 && (
            <>
              <AnimatePresence mode="popLayout">
                {sortByArea(showPersonal).map((person, index) => (
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring" }}
                    className={`shadow-lg shadow-gray-500 w-[90%] border-t-8 border-[#6D1610] ${
                      isMobile ? "basis-[48%]" : "basis-[30%]"
                    }`}
                    key={index}
                  >
                    <div className="flex items-center justify-center text-center py-2 text-2xl font-extrabold text-[#6D1610]">
                      <h1>{person.area}</h1>
                    </div>
                    <div className="bg-[#EFEFEF] mx-3 mb-5">
                      <h1 className="bg-[#6D1610] text-lg text-center text-white py-2">
                        {person.name}
                      </h1>
                      <div className="flex flex-col gap-5 p-2 break-all">
                        <div className="flex items-center gap-3">
                          <p>Ubicación:</p>
                          <p className="flex flex-col">
                            {person.ubication.place && (
                              <span>{person.ubication.place}</span>
                            )}
                            {person.ubication.floor && (
                              <span>{person.ubication.floor}</span>
                            )}
                            {person.ubication.street && (
                              <span>{person.ubication.street}</span>
                            )}
                            {person.ubication.neighborhood && (
                              <span>{person.ubication.neighborhood}</span>
                            )}
                            {person.ubication.cp && (
                              <span>{person.ubication.cp}</span>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-5">
                          <p>Contacto:</p>
                          <p className="flex flex-col">
                            {person.contacts ? (
                              <>
                                {person.contacts.map((contact, index) => (
                                  <span key={index}>{contact}</span>
                                ))}
                              </>
                            ) : (
                              <>
                                <span>No Disponible</span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>
        {showPersonal.length === 0 && (
          <div className="pb-6">
            <Alert
              className="bg-[#6D1610]"
              icon={<FiAlertCircle size="1.5em" />}
            >
              No se encontró ningún resultado.
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}

export default MunicipalDirectoryPage;
