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

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();
  const { changeIsLogin } = useExtaData();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const showInputPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <div className="flex flex-col justify-between h-screen">
        <div className="col-span-1">
          <Link to="/" className="text-orange-300 font-bold">
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
        <div className="col-span-1 flex h-[calc(100vh-190px)] items-center justify-center">
          <div>
            <h1 className="font-playfair text-red-800 text-6xl text-center mb-10">
              ¡Bienvenido!
            </h1>
            <div className="overflow-hidden">
              <AnimatePresence mode="sync">
                {signinErrors.map((error, i) => (
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
            <form className="text-center min-w-[405px]" onSubmit={onSubmit}>
              <div className={errors.email ? "my-5" : "my-10"}>
                <input
                  type="text"
                  maxLength={50}
                  placeholder="Correo electrónico"
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
              <div className={errors.password ? "mb-5" : "mb-10"}>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    maxLength={25}
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
              </div>
              <button
                type="submit"
                className="bg-[#6D1610] font-extrabold text-lg w-[50%] text-white px-4 py-4 rounded-md"
              >
                Iniciar sesión
              </button>
            </form>
            <span className="text-center">
              <h3 className="mt-5">
                <span className="font-semibold mr-5">
                  ¿No tienes una cuenta?
                </span>
                <button
                  onClick={() => changeIsLogin(false)}
                  className="text-orange-300 font-bold"
                >
                  ¡Regístrate!
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

export default LoginComponent;
