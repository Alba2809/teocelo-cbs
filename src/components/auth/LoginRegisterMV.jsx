import {
  Card,
  CardBody,
  CardHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useExtaData } from "../../context/ExtraDataContext";
import { AnimatePresence, motion } from "framer-motion";
import LogoHorizontal from "../../assets/Logos/LogoHorizontal.png";
import EscudoVertical from "../../assets/Logos/EscudoVertical.png";
import AlertMessage from "../AlertMessage";

function LoginRegisterMV() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerR,
    handleSubmit: handleSubmitR,
    formState: { errors: errorsR },
  } = useForm();
  const { signin, signup, errors: signInOutErrors, setErrors } = useAuth();
  const { isLogin } = useExtaData();
  const [type, setType] = useState(isLogin ? "login" : "register");
  const [showPasswordL, setShowPasswordL] = useState(false);
  const [showPasswordR, setShowPasswordR] = useState(false);

  const onSubmitLogin = handleSubmit((data) => {
    signin(data);
  });

  const onSubmitRegister = handleSubmitR(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (signInOutErrors.length > 0) setErrors([]);
  }, [type]);

  const showInputPasswordL = () => setShowPasswordL(!showPasswordL);
  const showInputPasswordR = () => setShowPasswordR(!showPasswordR);

  return (
    <div className="flex flex-col h-screen">
      <Link to="/" className="">
        <img
          src={LogoHorizontal}
          alt="Imagen horizontal"
          className="float-left mx-5 my-5 h-24"
        />
        <img
          src={EscudoVertical}
          alt="Imagen vertical"
          className="float-right mx-5 my-5 h-24"
        />
      </Link>
      <div className="shrink flex items-center justify-center h-full">
        <Card className="w-full max-w-[24rem]">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center px-4 py-8 text-center bg-[#6D1610]"
          >
            <div className="mb-4 h-20 p-6 text-white">
              {type === "login" ? (
                <Typography variant="h3" color="white">
                  ¡Bienvenido!
                </Typography>
              ) : (
                <Typography variant="h3" color="white">
                  ¡Registrate!
                </Typography>
              )}
            </div>
          </CardHeader>
          <CardBody className="bg-[#EFEEEE]">
            <Tabs value={type} className="!overflow-y-hidden">
              <TabsHeader className="relative z-0 ">
                <Tab value="login" onClick={() => setType("login")}>
                  Iniciar sesión
                </Tab>
                <Tab value="register" onClick={() => setType("register")}>
                  Registrarse
                </Tab>
              </TabsHeader>
              <TabsBody
                className="!overflow-x-hidden !overflow-y-hidden"
                animate={{
                  initial: {
                    x: type === "login" ? 400 : -400,
                  },
                  mount: {
                    x: 0,
                  },
                  unmount: {
                    x: type === "login" ? 400 : -400,
                  },
                }}
              >
                <div className="my-5 overflow-hidden">
                  <AnimatePresence mode="sync">
                    {signInOutErrors.map((error, i) => (
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
                <TabPanel value="login" className="p-0">
                  <form className="text-center" onSubmit={onSubmitLogin}>
                    <div className={`${errors.email ? "mb-5" : "mb-10"}`}>
                      <input
                        type="email"
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
                    <div className={errors.password ? "mb-5" : "mb-10"}>
                      <div className="relative">
                        <input
                          type={showPasswordL ? "text" : "password"}
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
                          {showPasswordL ? (
                            <GoEyeClosed
                              size="1.5em"
                              onClick={showInputPasswordL}
                              className="cursor-pointer"
                            />
                          ) : (
                            <FaEye
                              size="1.5em"
                              onClick={showInputPasswordL}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                      {errors.password && (
                        <p className="text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-[#6D1610] font-extrabold text-lg w-[50%] text-white px-4 py-2 rounded-md"
                    >
                      Iniciar sesión
                    </button>
                  </form>
                </TabPanel>
                <TabPanel value="register" className="p-0">
                  <form className="text-center" onSubmit={onSubmitRegister}>
                    <div className={errorsR.firstname ? "mb-4" : "mb-8"}>
                      <input
                        type="text"
                        placeholder="Nombre"
                        maxLength={25}
                        {...registerR("firstname", {
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
                      {errorsR.firstname && (
                        <p className="text-red-500">
                          {errorsR.firstname.message}
                        </p>
                      )}
                    </div>
                    <div className={errorsR.lastname ? "mb-4" : "mb-8"}>
                      <input
                        type="text"
                        placeholder="Apellidos"
                        maxLength={25}
                        {...registerR("lastname", {
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
                      {errorsR.lastname && (
                        <p className="text-red-500">
                          {errorsR.lastname.message}
                        </p>
                      )}
                    </div>
                    <div className={errorsR.phonenumber ? "mb-4" : "mb-8"}>
                      <input
                        type="text"
                        placeholder="Número de teléfono"
                        maxLength={10}
                        minLength={10}
                        {...registerR("phonenumber", {
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
                      {errorsR.phonenumber && (
                        <p className="text-red-500">
                          {errorsR.phonenumber.message}
                        </p>
                      )}
                    </div>
                    <div className={errorsR.email ? "mb-4" : "mb-8"}>
                      <input
                        type="text"
                        placeholder="Correo electrónico"
                        maxLength={50}
                        {...registerR("email", {
                          required: "Se requiere el correo",
                          maxLength: {
                            value: 50,
                            message: "No debe exceder los 50 caracteres",
                          },
                        })}
                        className="w-full text-black px-4 py-2 rounded-md border-2 border-black"
                      />
                      {errorsR.email && (
                        <p className="text-red-500">{errorsR.email.message}</p>
                      )}
                    </div>
                    <div className={errorsR.password ? "mb-5" : "mb-10"}>
                      <div className="relative">
                        <input
                          type={showPasswordR ? "text" : "password"}
                          placeholder="Contraseña"
                          maxLength={25}
                          {...registerR("password", {
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
                          {showPasswordR ? (
                            <GoEyeClosed
                              size="1.5em"
                              onClick={showInputPasswordR}
                              className="cursor-pointer"
                            />
                          ) : (
                            <FaEye
                              size="1.5em"
                              onClick={showInputPasswordR}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                      {errorsR.password && (
                        <p className="text-red-500">
                          {errorsR.password.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-[#6D1610] font-extrabold text-lg w-[50%] text-white px-4 py-2 rounded-md"
                    >
                      Crear cuenta
                    </button>
                  </form>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default LoginRegisterMV;
