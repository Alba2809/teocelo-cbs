import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { useExtaData } from "../../context/ExtraDataContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoHorizontal from "../../assets/Logos/LogoHorizontal.png";
import EscudoVertical from "../../assets/Logos/EscudoVertical.png";
import AlertMessage from "../AlertMessage";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { changeIsLogin } = useExtaData();
  const { signup, errors: registerErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const showInputPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <div className="grid grid-cols-1 gap-0 h-screen">
        <div className="col-span-1">
          <Link to="/">
            <img
              src={LogoHorizontal}
              alt="Imagen horizontal"
              className="float-left ml-10 my-5 h-24"
            />
            <img
              src={EscudoVertical}
              alt="Imagen vertical"
              className="float-right mr-10 my-5 h-24"
            />
          </Link>
        </div>
        <div className="flex h-[calc(100vh-190px)] items-center justify-center mx-5">
          <div className="w-full lg:w-[80%]">
            <h1 className="font-playfair text-red-800 text-6xl text-center mb-10">
              ¡Registrate!
            </h1>
            <div className="mb-5 overflow-hidden">
              <AnimatePresence mode="sync">
                {registerErrors.map((error, i) => (
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
            <form onSubmit={onSubmit} className="text-center">
              <div className={errors.firstname ? "mb-4" : "mb-8"}>
                <input
                  type="text"
                  placeholder="Nombre"
                  maxLength={25}
                  {...register("firstname", {
                    required: "Se requiere el nombre",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras",
                    },
                    maxLength: {
                      value: 25,
                      message: "No debe exceder los 25 caracteres",
                    },
                  })}
                  className="w-full text-black px-4 py-2 rounded-md border-2 border-black"
                />
                {errors.firstname && (
                  <p className="text-red-500">{errors.firstname.message}</p>
                )}
              </div>
              <div className={errors.lastname ? "mb-4" : "mb-8"}>
                <input
                  type="text"
                  placeholder="Apellidos"
                  maxLength={25}
                  {...register("lastname", {
                    required: "Se requieren los apellidos",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Solo se permiten letras",
                    },
                    maxLength: {
                      value: 25,
                      message: "No debe exceder los 25 caracteres",
                    },
                  })}
                  className="w-full text-black px-4 py-2 rounded-md border-2 border-black"
                />
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname.message}</p>
                )}
              </div>
              <div className={errors.phonenumber ? "mb-4" : "mb-8"}>
                <input
                  type="text"
                  placeholder="Número de teléfono"
                  minLength={10}
                  maxLength={10}
                  {...register("phonenumber", {
                    required: "Se requiere el número de teléfono",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten letras",
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
                  className="w-full text-black px-4 py-2 rounded-md border-2 border-black"
                />
                {errors.phonenumber && (
                  <p className="text-red-500">{errors.phonenumber.message}</p>
                )}
              </div>
              <div className={errors.email ? "mb-4" : "mb-8"}>
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  maxLength={50}
                  {...register("email", {
                    required: "Se requiere el correo electrónico",
                    maxLength: {
                      value: 50,
                      message: "No debe exceder los 50 caracteres",
                    },
                  })}
                  className="w-full text-black px-4 py-2 rounded-md border-2 border-black"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  maxLength={25}
                  minLength={6}
                  {...register("password", {
                    required: "Se requiere la contraseña",
                    pattern: {
                      value: /^[a-zA-Z0-9_\-\s@\$!%*?&]+$/,
                      message:
                        "Solo se permiten letras, números, espacios y los caracteres (-, _, @, $, !, %, *, ? y &)",
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
                  className="w-full text-black pl-4 pr-10 py-2 rounded-md border-2 border-black block"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  {showPassword ? (
                    <GoEyeClosed
                      size="1.5em"
                      onClick={showInputPassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <FaEye
                      size="1.5em"
                      onClick={showInputPassword}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="bg-[#6D1610] font-extrabold text-lg w-[50%] mt-10 text-white px-4 py-2 rounded-md"
              >
                Crear cuenta
              </button>
            </form>
            <span className="text-center">
              <h3 className="mt-5">
                <span className="font-semibold mr-5">
                  ¿Ya tienes una cuenta?
                </span>
                <button
                  onClick={() => changeIsLogin(true)}
                  className="text-orange-300 font-bold"
                >
                  ¡Inicia sesión!
                </button>
              </h3>
            </span>
          </div>
        </div>
        <div className="text-center">
          <span>
            © 2022-2025{" "}
            <span className="text-orange-300"> Gobierno de Teocelo. </span>
            Todos los derechos reservados.
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
