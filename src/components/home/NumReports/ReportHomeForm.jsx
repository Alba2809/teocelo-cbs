import { useForm } from "react-hook-form";
import { useEmail } from "../../../context/EmailCOntext";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@material-tailwind/react";
import DialogMessage from "../../DialogMessage";
import AlertMessage from "../../AlertMessage";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

function ReportHomeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: sendErrors, sendEmail } = useEmail();
  const [open, setOpen] = useState(false);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await sendEmail(data);

      if (res.status === 200) {
        setSent(true);
        formRef.current.reset();
      } else handleOpen();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleOpen();
    }
  });

  useEffect(() => {
    if (sent === true) {
      const timer = setTimeout(() => {
        setSent(false);
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [sent]);

  const handleAction = (opc) => {
    setOpen(false);
  };

  return (
    <div>
      <div className="font-extrabold text-center text-4xl pt-5 pb-20 mt-5 lg:mt-0">
        ATENCIÓN CIUDADANA
      </div>
      <div className="flex flex-col items-center justify-center mx-14 lg:mx-0">
        <div className="overflow-hidden w-full lg:w-[60%]">
          <AnimatePresence mode="sync">
            {sendErrors?.map((error, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, y: -10, opacity: 0 }}
                animate={{ height: 48, y: 0, opacity: 1 }}
                exit={{ height: 0, y: -10, opacity: 0 }}
                transition={{ type: "spring", delay: i * 0.2 }}
                className="mb-2 w-full"
              >
                <AlertMessage key={i} message={error} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full lg:w-[60%] relative"
          ref={formRef}
        >
          <AnimatePresence>
            {loading && (
              <div className="absolute w-full h-full flex justify-center items-center">
                <motion.div
                  className="bg-gray-600 bg-opacity-60 backdrop-blur-sm px-5 py-3 rounded-md"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring" }}
                >
                  <Spinner className="w-10 h-10" />
                </motion.div>
              </div>
            )}
            {sent && (
              <div className="absolute w-full h-full flex justify-center items-center">
                <motion.div
                  className="bg-gray-600 bg-opacity-60 backdrop-blur-sm  rounded-md"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", delay: 0.5 }}
                >
                  <motion.svg
                    width="80"
                    height="64"
                    viewBox="0 0 80 64"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.line
                      x1="15"
                      y1="40"
                      x2="39"
                      y2="55"
                      stroke="#00cc88"
                      strokeWidth="5"
                      strokeLinecap="round"
                      variants={draw}
                      custom={0.5}
                    />
                    <motion.line
                      x1="39"
                      y1="55"
                      x2="70"
                      y2="9"
                      stroke="#00cc88"
                      strokeWidth="5"
                      strokeLinecap="round"
                      variants={draw}
                      custom={1.5}
                    />
                  </motion.svg>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          <div className="flex flex-col bg-[#EFEEEE] rounded-xl p-4">
            <div className="mb-11">
              <span className="font-bold text-xl font-serif">
                Nombre completo:
              </span>
              <input
                type="text"
                placeholder=""
                {...register("fullname", {
                  required: "Se requiere el nombre",
                  pattern: {
                    value: /^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/,
                    message: "Solo se permiten letras, números y espacios",
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
                maxLength={50}
                minLength={6}
                className={`w-full text-black px-4 py-2 rounded-md border-2 h-10 focus:outline-none ${
                  errors.fullname ? "border-red-500" : "border-black"
                }`}
              />
              {errors.fullname && (
                <p className="text-red-500">{errors.fullname.message}</p>
              )}
            </div>
            <div className="mb-11">
              <span className="font-bold text-xl font-serif">
                Correo electrónico:
              </span>
              <input
                type="email"
                placeholder=""
                {...register("email", {
                  required: "Se requiere el correo electrónico",
                  maxLength: {
                    value: 50,
                    message: "No debe exceder los 50 caracteres",
                  },
                })}
                maxLength={50}
                className={`w-full text-black px-4 py-2 rounded-md border-2 h-10 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-black"
                }`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-11">
              <span className="font-bold text-xl font-serif">Asunto:</span>
              <input
                type="text"
                placeholder=""
                {...register("subject", {
                  required: "Se requiere un asunto",
                  pattern: {
                    value: /^[a-zA-Z0-9\s¿?.,áéíóúÁÉÍÓÚüÜñÑ]+$/u,
                    message:
                      "Solo se permiten letras, números, espacios, los signos (¿ ? , .) y acentos",
                  },
                  maxLength: {
                    value: 40,
                    message: "No debe exceder los 40 caracteres",
                  },
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                minLength={6}
                maxLength={40}
                className={`w-full text-black px-4 py-2 rounded-md border-2 h-10 focus:outline-none ${
                  errors.email ? "border-red-500" : "border-black"
                }`}
              />
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </div>
            <div>
              <span className="font-bold text-xl font-serif">Mensaje:</span>
              <textarea
                {...register("message", {
                  required: "Se requiere un mensaje",
                  pattern: {
                    value: /^[a-zA-Z0-9\s.,¿?áéíóúÁÉÍÓÚüÜñÑ]+$/,
                    message:
                      "Solo se permiten letras, números, espacios y los signos (¿ ? , .)",
                  },
                  maxLength: {
                    value: 500,
                    message: "No debe exceder los 500 caracteres",
                  },
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                minLength={6}
                maxLength={500}
                className={`w-full text-black px-4 py-2 rounded-md border-2 resize-none focus:outline-none ${
                  errors.message ? "border-red-500" : "border-black"
                }`}
                rows={5}
              ></textarea>
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>
          </div>
          <motion.button
            type="submit"
            className="bg-[#6D1610] font-extrabold font-montserrat text-2xl w-[50%] text-white py-2 rounded-3xl self-center mt-8"
            whileHover={{ scale: 1.1 }}
          >
            Enviar
          </motion.button>
        </form>
      </div>
      <DialogMessage
        handleOpen={handleOpen}
        open={open}
        handleAction={handleAction}
        buttonCancel={false}
        title="Aviso"
        message="Hubo un problema enviando el correo. Intentelo más tarde."
      />
    </div>
  );
}

export default ReportHomeForm;
