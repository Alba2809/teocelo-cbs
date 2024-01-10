import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { useExtaData } from "../../context/ExtraDataContext";
import { useLamps } from "../../context/LampContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputSelect from "../../components/InputSelect";
import HeaderTittle from "../../components/HeaderTittle";
import AlertMessage from "../../components/AlertMessage";

const options = ["LED", "Antigua", "Cucharón"];

function LampFormsPage({ type }) {
  const { user } = useAuth();
  const {
    isMobile,
    expLettersNumbers,
    expTextGeneral,
    expJustLetters,
  } = useExtaData();
  const {
    createLampRequest,
    createLampReport,
    errors: createLampErrors,
  } = useLamps();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    if (type === "request") {
      const res = await createLampRequest(data);
      if (res) navigate("/perfile");
    } else {
      const res = await createLampReport(data);
      if (res) navigate("/perfile");
    }
  });

  const onOptionChange = (op) => {
    setValue("typeLamp", op);
  };

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle
        title={
          type === "request"
            ? "Solicitud para la instalación de una lámpara"
            : "Reportar luminaria descompuesta"
        }
      />
      <div className="m-10 overflow-hidden">
        <AnimatePresence mode="sync">
          {createLampErrors.map((error, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, y: -10, opacity: 0 }}
              animate={{ height: 48, y: 0, opacity: 1 }}
              exit={{ height: 0, y: -10, opacity: 0 }}
              transition={{ type: "spring", delay: i * 0.2 }}
            >
              <AlertMessage key={i} message={error} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form onSubmit={onSubmit} className="mx-24 my-10 flex flex-col gap-10">
        <div className="flex items-center">
          <hr className="flex-1 border-t border-black border" />
          <span className="px-4 text-center font-montserrat font-bold text-black text-xl lg:text-3xl">
            Datos personales
          </span>
          <hr className="flex-1 border-t border-black border" />
        </div>
        <div className="flex flex-wrap w-full gap-10 mb-10">
          <div className="grow">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Nombre(s):
            </label>
            <input
              type="text"
              placeholder="Nombre(s)"
              value={user.firstname}
              className="w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 border-black"
              disabled
            />
          </div>
          <div className="grow">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Apellidos(s):
            </label>
            <input
              type="text"
              placeholder="Apellidos"
              value={user.lastname}
              className="w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 border-black"
              disabled
            />
          </div>
          <div className="grow">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Teléfono:
            </label>
            <input
              type="text"
              placeholder="Teléfono"
              value={user.phonenumber ?? "2255114422"}
              className="w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 border-black"
              disabled
            />
          </div>
        </div>

        <div className="flex items-center">
          <hr className="flex-1 border-t border-black border" />
          <span className="px-4 text-center font-montserrat font-bold text-black text-xl lg:text-3xl">
            Ubicación
          </span>
          <hr className="flex-1 border-t border-black border" />
        </div>
        <div className="flex flex-wrap w-full gap-10 mb-10">
          <div className="grow relative">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Calle:
            </label>
            <input
              type="text"
              placeholder="Calle"
              {...register("street", {
                required: "Se requiere la calle",
                pattern: {
                  value: expJustLetters,
                  message: "Solo se permiten letras",
                },
                maxLength: {
                  value: 25,
                  message: "No debe exceder los 25 caracteres",
                },
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              maxLength={25}
              minLength={6}
              className={`w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 ${
                errors.street
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-blue-gray-200"
              }`}
            />
            {errors.street && (
              <p className="text-red-500 absolute -bottom-6">
                {errors.street.message}
              </p>
            )}
          </div>
          <div className="w-min grow relative">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Número:
            </label>
            <input
              type="text"
              placeholder="Número"
              {...register("number", {
                required: "Se requiere el número",
                pattern: {
                  value: expLettersNumbers,
                  message: "Solo se permiten letras y números",
                },
                maxLength: {
                  value: 10,
                  message: "No debe exceder los 10 caracteres",
                },
              })}
              maxLength={10}
              className={`w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 ${
                errors.number
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-blue-gray-200"
              }`}
            />
            {errors.number && !isMobile && (
              <p className="text-red-500 absolute -bottom-6">
                {errors.number.message}
              </p>
            )}
          </div>
          <div className="grow relative">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Colonia:
            </label>
            <input
              type="text"
              placeholder="Colonia"
              {...register("colony", {
                required: "Se requiere la colonia",
                pattern: {
                  value: expJustLetters,
                  message: "Solo se permiten letras",
                },
                maxLength: {
                  value: 20,
                  message: "No debe exceder los 20 caracteres",
                },
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              maxLength={20}
              minLength={6}
              className={`w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 ${
                errors.colony
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-blue-gray-200"
              }`}
            />
            {errors.colony && (
              <p className="text-red-500 absolute -bottom-6">
                {errors.colony.message}
              </p>
            )}
          </div>
          <div className="grow relative">
            <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
              Localidad:
            </label>
            <input
              type="text"
              placeholder="Localidad"
              {...register("town", {
                required: "Se requiere la localidad",
                pattern: {
                  value: expJustLetters,
                  message: "Solo se permiten letras",
                },
                maxLength: {
                  value: 15,
                  message: "No debe exceder los 15 caracteres",
                },
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              maxLength={15}
              minLength={6}
              className={`w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 ${
                errors.town
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-blue-gray-200"
              }`}
            />
            {errors.town && (
              <p className="text-red-500 absolute -bottom-6">
                La localidad es requerida.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-10">
          <div className="grow w-min">
            <p className="px-4 text-center font-montserrat font-bold text-black text-xl lg:text-3xl">
              {type === "request" ? "Comentarios adicionales" : "Referencia"}
              {errors.commentsCitizen && (
                <p className="text-red-500 text-lg font-normal">
                  {errors.commentsCitizen.message}
                </p>
              )}
            </p>
            <div className="flex justify-center w-full">
              <textarea
                {...register("commentsCitizen", {
                  required: false,
                  pattern: {
                    value: expTextGeneral,
                    message: "Solo se permiten letras, números, comas y puntos",
                  },
                  maxLength: {
                    value: 500,
                    message: "No debe exceder los 500 caracteres",
                  },
                })}
                maxLength={500}
                className="text-black px-4 py-2 rounded-md border border-black resize-none shadow w-full lg:w-2/3"
                placeholder={
                  type === "request"
                    ? "Referencia, motivo de la solicitud, etc."
                    : "Información que ayude a ubicar más rápido la lámpara reportada."
                }
                rows={8}
              ></textarea>
            </div>
          </div>
          {type === "report" && (
            <div className={isMobile ? "grow" : ""}>
              <label className="font-montserrat font-bold text-lg lg:text-2xl text-black">
                Tipo de lámpara
              </label>
              <InputSelect
                options={options}
                register={register}
                registerName="typeLamp"
                onOptionChange={onOptionChange}
              />
            </div>
          )}
        </div>

        <motion.div
          className="w-72 flex self-center"
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full">
            <button
              className="bg-[#6d1610] text-white rounded-full font-montserrat text-xl lg:text-3xl py-1 px-5 w-full"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}

export default LampFormsPage;
