import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useOfficial } from "../../context/OfficialContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HeaderTittle from "../../components/HeaderTittle";
import AlertMessage from "../../components/AlertMessage";
import UploadDocument from "../../components/UploadDocument";
import DialogMessage from "../../components/DialogMessage";
import { useState } from "react";
import { useExtaData } from "../../context/ExtraDataContext";

function OfficialFormPage() {
  const { user } = useAuth();
  const { expTextGeneral } = useExtaData();
  const { createOfficial, errors: createOfficialErrors } = useOfficial();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    formData.append("commentsCitizen", data.commentsCitizen);
    formData.append("document", data.document);

    const res = await createOfficial(formData);
    if (res) navigate("/perfile");
  });

  const handleAction = (opc) => {
    handleOpen();
  };

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title="Oficialía de partes" />
      <div className="m-10 overflow-hidden">
        <AnimatePresence mode="sync">
          {createOfficialErrors.map((error, i) => (
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
              value={user.phonenumber}
              className="w-full text-black font-montserrat font-medium text-base lg:text-xl px-4 py-2 rounded-md border-2 border-black"
              disabled
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-5 w-full font-montserrat">
          <div className="lg:w-[70%] md:w-[50%] w-full">
            <h1 className="font-bold text-lg lg:text-2xl">
              Comentarios adicionales
            </h1>
            <div className="flex flex-col justify-center w-full">
              <textarea
                {...register("commentsCitizen", {
                  required: false,
                  pattern: {
                    value: expTextGeneral,
                    message:
                      "Solo se permiten letras, números, comas, puntos y acentos",
                  },
                  maxLength: {
                    value: 500,
                    message: "No debe exceder los 500 caracteres",
                  },
                })}
                maxLength={500}
                className="text-black px-4 py-2 rounded border border-black resize-none shadow w-full lg:w-2/3"
                placeholder="Opcional..."
                rows={8}
              ></textarea>
              {errors.commentsCitizen && (
                <p className="text-red-500">{errors.commentsCitizen.message}</p>
              )}
            </div>
          </div>
          <div className="lg:w-[20%] md:w-[40%] w-full">
            <h1 className="font-bold text-lg lg:text-2xl ">Adjuntar oficio:</h1>
            <Controller
              name="document"
              control={control}
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <UploadDocument {...field} />
              )}
            />
          </div>
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

      <DialogMessage
        handleOpen={handleOpen}
        open={open}
        handleAction={handleAction}
        buttonCancel={false}
        title="Error"
        message="Algo salió mal en su envío solicitud, vuelva a intentarlo o intentelo más tarde."
      />
    </div>
  );
}

export default OfficialFormPage;
