import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { useExtaData } from "../../context/ExtraDataContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useComplaint } from "../../context/ComplaintContext";
import { IoCheckmark } from "react-icons/io5";
import UploadImage from "../../components/UploadImage";
import AlertMessage from "../../components/AlertMessage";
import "../../styles/InputNumber.css";
import HeaderTittle from "../../components/HeaderTittle";

function ComplaintFormPage() {
  const { user } = useAuth();
  const {
    isMobile,
    expLettersNumbers,
    expTextGeneral,
    expJustLetters,
    expJustNumbers,
  } = useExtaData();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { createComplaint, errors: createComplaintErrors } = useComplaint();
  const [apellidoPaterno, apellidoMaterno] = user.lastname.split(" ");
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(null);

  const handleChangeCheckBox = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (isChecked) setTermsAccepted(false);
    else setTermsAccepted(true);
  }, [isChecked]);

  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!isChecked) return setTermsAccepted(true);

    const formData = new FormData();

    formData.append("date", data.date);
    formData.append("firstname", data.firstname);
    formData.append("lastnameP", data.lastnameP);
    formData.append("lastnameM", data.lastnameM);
    formData.append("phonenumber", data.phonenumber);
    formData.append("email", data.email1);
    formData.append("colony", data.colony);
    formData.append("pcode", data.pcode);
    formData.append("street", data.street);
    formData.append("outnumber", data.outnumber);
    formData.append("innumber", data.innumber);
    formData.append("staffname", data.staffname);
    formData.append("staffcharge", data.staffcharge);
    formData.append("staffarea", data.staffarea);
    formData.append("commentsCitizen", data.commentsCitizen);
    formData.append("image", data.image);

    try {
      const res = await createComplaint(formData);
      if (res) navigate("/perfile");
    } catch (error) {}
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const email1 = watch("email1");
  const email2 = watch("email2");

  const validateEmails = () => {
    return email2 === email1 || "Los correos electrónicos no coinciden";
  };

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Quejas y/o denuncias contra servidores públicos"} />
      <div className="m-10 overflow-hidden">
        <AnimatePresence mode="sync">
          {createComplaintErrors.map((error, i) => (
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

      <form onSubmit={onSubmit} className="font-montserrat mx-16">
        <div className="w-full lg:w-[30%] mb-5">
          <label className="font-bold text-2xl">Fecha de los hechos:</label>
          <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
            <input
              type="date"
              onChange={handleChange}
              defaultValue={formatDate(new Date())}
              className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                errors.date
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-blue-gray-200"
              }`}
              ref={dateInputRef}
              {...register("date", { required: true })}
            />
            <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
              Seleccione la fecha en la que ocurrieron los hechos
            </p>
          </div>
          {errors.date && <p className="text-red-500">Se requiere una fecha</p>}
        </div>
        <div className="flex flex-wrap gap-y-5 justify-between">
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl">Nombre(s):</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                defaultValue={user.firstname}
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.firstname
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("firstname", {
                  required: "Se requiere el nombre",
                  pattern: {
                    value: /^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 25,
                    message: "No debe exceder los 25 caracteres",
                  },
                })}
                maxLength={25}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su(s) nombre(s)
              </p>
            </div>
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl break-alls">
              Apellido paterno:
            </label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                defaultValue={apellidoPaterno ?? ""}
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.lastnameP
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("lastnameP", {
                  required: "Se requiere el apellido paterno",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 15,
                    message: "No debe exceder los 15 caracteres",
                  },
                })}
                maxLength={15}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su apellido paterno
              </p>
            </div>
            {errors.lastnameP && (
              <p className="text-red-500">{errors.lastnameP.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl">Apellido materno:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                defaultValue={apellidoMaterno ?? ""}
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.lastnameM
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("lastnameM", {
                  required: "Se requiere el apellido materno",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 15,
                    message: "No debe exceder los 15 caracteres",
                  },
                })}
                maxLength={15}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su apellido materno
              </p>
            </div>
            {errors.lastnameM && (
              <p className="text-red-500">{errors.lastnameM.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl">Teléfono:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.phonenumber
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("phonenumber", {
                  required: "Se requiere el número de teléfono",
                  pattern: {
                    value: expJustNumbers,
                    message: "Solo se permiten números",
                  },
                  maxLength: {
                    value: 10,
                    message: "Debe tener 10 dígitos",
                  },
                  minLength: {
                    value: 10,
                    message: "Debe tener 10 dígitos",
                  },
                })}
                maxLength={10}
                minLength={10}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su número de télefono a 10 dígitos
              </p>
            </div>
            {errors.phonenumber && (
              <p className="text-red-500">{errors.phonenumber.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl">Correo electrónico:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="email"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.email1
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("email1", {
                  required: "Se requiere el correo electrónico",
                  maxLength: {
                    value: 50,
                    message: "No debe exceder los 50 caracteres",
                  },
                })}
                maxLength={50}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su correo electrónico
              </p>
            </div>
            {errors.email1 && (
              <p className="text-red-500">{errors.email1.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[30%]">
            <label className="font-bold text-xl">
              Confirmar correo electrónico:
            </label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="email"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.email2
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("email2", {
                  required: "Se requiere que confirme el correo electrónico",
                  validate: validateEmails,
                  maxLength: {
                    value: 50,
                    message: "No debe exceder los 50 caracteres",
                  },
                })}
                maxLength={50}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Confirme su correo electrónico
              </p>
            </div>
            {errors.email2 && (
              <p className="text-red-500">{errors.email2.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[20%]">
            <label className="font-bold text-xl">Colina:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.colony
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
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
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su colonia
              </p>
            </div>
            {errors.colony && (
              <p className="text-red-500">{errors.colony.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[15%]">
            <label className="font-bold text-xl">Código postal:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.pcode
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("pcode", {
                  required: "Se requiere el código postal",
                  pattern: {
                    value: expJustNumbers,
                    message: "Solo se permiten números",
                  },
                  maxLength: {
                    value: 5,
                    message: "Debe tener 5 dígitos",
                  },
                  minLength: {
                    value: 5,
                    message: "Debe tener 5 dígitos",
                  },
                })}
                maxLength={5}
                minLength={5}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba su código postal
              </p>
            </div>
            {errors.pcode && (
              <p className="text-red-500">{errors.pcode.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[35%]">
            <label className="font-bold text-xl">Calle:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.street
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
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
                minLength={6}
                maxLength={25}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba el nombre de su calle
              </p>
            </div>
            {errors.street && (
              <p className="text-red-500">{errors.street.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[10%]">
            <label className="font-bold text-xl">Núm. Ext:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.outnumber
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("outnumber", {
                  required: "Se requiere el núm. ext.",
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
              />
              <p className="text-center py-2 lg:py-1 text-[#6D1610] font-bold text-lg lg:text-sm">
                Núm. exterior de su domicilio
              </p>
            </div>
            {errors.outnumber && (
              <p className="text-red-500">{errors.outnumber.message}</p>
            )}
          </div>
          <div className="w-[45%] lg:w-[10%]">
            <label className="font-bold text-xl">Núm. Int:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.innumber
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("innumber", {
                  required: "Se requiere el núm. int.",
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
              />
              <p className="text-center py-2 lg:py-1 text-[#6D1610] font-bold text-lg lg:text-sm">
                Núm. interior de su domicilio
              </p>
            </div>
            {errors.innumber && (
              <p className="text-red-500">{errors.innumber.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%]">
            <label className="font-bold text-xl">
              Nombre del servidor público:
            </label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.staffname
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("staffname", {
                  required: "Se requiere el nombre del servidor público",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 50,
                    message: "No debe exceder los 50 caracteres",
                  },
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                minLength={6}
                maxLength={50}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba el nombre del servidor público
              </p>
            </div>
            {errors.staffname && (
              <p className="text-red-500">{errors.staffname.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%]">
            <label className="font-bold text-xl">Cargo o puesto:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.staffcharge
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("staffcharge", {
                  required: "Se requiere el cargo del servidor público",
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
                minLength={6}
                maxLength={25}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba el cargo del servidor público
              </p>
            </div>
            {errors.staffcharge && (
              <p className="text-red-500">{errors.staffcharge.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%]">
            <label className="font-bold text-xl">Área en la que labora:</label>
            <div className="bg-[#F1F1F1] border-2 border-black rounded-md">
              <input
                type="text"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 rounded-md border-b-2 ${
                  errors.staffarea
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                }`}
                {...register("staffarea", {
                  required: "Se requiere el área del servidor público",
                  pattern: {
                    value: expJustLetters,
                    message: "Solo se permiten letras",
                  },
                  maxLength: {
                    value: 20,
                    message: "No debe exceder los 20 caracteres",
                  },
                })}
                maxLength={20}
              />
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba el nombre de área del servidor público
              </p>
            </div>
            {errors.staffarea && (
              <p className="text-red-500">{errors.staffarea.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[60%]">
            <label className="font-bold text-xl">
              Explicación de los hechos:
            </label>
            <div className="bg-[#F1F1F1] border-2 border-black">
              <textarea
                rows="10"
                className={`w-full text-black font-medium text-base lg:text-xl px-4 py-2 border-b-2 ${
                  errors.commentsCitizen
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-blue-gray-200"
                } resize-none`}
                {...register("commentsCitizen", {
                  required: "Se requiere la explicación.",
                  pattern: {
                    value: expTextGeneral,
                    message: "Solo se permiten letras, números, comas y puntos",
                  },
                  maxLength: {
                    value: 800,
                    message: "No debe exceder los 800 caracteres",
                  },
                })}
                maxLength={800}
              ></textarea>
              <p className="text-center py-2 mx-4 text-[#6D1610] font-bold text-lg">
                Escriba de manera clara y concreta los hechos que provoquen su
                queja o denuncia
              </p>
            </div>
            {errors.commentsCitizen && (
              <p className="text-red-500">{errors.commentsCitizen.message}</p>
            )}
          </div>
          <div className="w-full lg:w-[30%]">
            <div className="w-full flex justify-center">
              <div className="w-[70%] flex flex-col items-center">
                <label className="font-bold text-xl">Adjuntar evidencia:</label>
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <UploadImage {...field} />
                  )}
                />
                {errors.image && (
                  <p className="text-red-500">Se requiere una imagen</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${isMobile ? "" : "col-span-2"} flex flex-col mt-10`}>
          <motion.div
            className={`flex items-center cursor-pointer`}
            onClick={handleChangeCheckBox}
          >
            <motion.div
              className={`w-8 h-8 border-2 rounded-md flex items-center justify-center ${
                isChecked ? "bg-[#6D1610]" : "border-black"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoCheckmark color="white" size="1.5em" />
            </motion.div>
            <p className="ml-2 font-medium text-xl">
              Al dar clic en esta casilla, acepta que su queja o denuncia se
              remite a Órgano de Control Interno con los datos proporcionados,
              sin posibilidad alguna de añadir más datos a la misma.
            </p>
          </motion.div>
          <p className="font-medium text-xl text-center my-5">
            Proceda a confirmar su solicitud dando clic en el botón “Enviar
            solicitud”.
          </p>
          {termsAccepted && (
            <p className="text-red-500 text-center mb-5">
              Debe aceptar los términos
            </p>
          )}
          <motion.div
            className="w-72 flex self-center"
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full">
              <button
                className="bg-[#6d1610] text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
                type="submit"
              >
                Enviar solicitud
              </button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

export default ComplaintFormPage;
