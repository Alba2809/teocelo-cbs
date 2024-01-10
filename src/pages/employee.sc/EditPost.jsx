import { useEffect, useState } from "react";
import { usePosts } from "../../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useExtaData } from "../../context/ExtraDataContext";
import AlertMessage from "../../components/AlertMessage";
import InputSelect from "../../components/InputSelect";
import { Controller, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import UploadImage from "../../components/UploadImage";
import DialogMessage from "../../components/DialogMessage";
import HeaderTittle from "../../components/HeaderTittle";

const options = ["Noticia", "Comunicado", "Convocatoria"];

function EditPost() {
  const { getPost, post, updatePost, errors: updatePostErrors } = usePosts();
  const { imageUrl, isMobile } = useExtaData();
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [imageRequired, setImageRequired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    async function asssingValues() {
      const formattedTitle = encodeURIComponent(params.title);
      await getPost(formattedTitle);
      setLoading(false);
      setValue("title", post.title);
      setValue("type", post.type);
      setValue("body", post.body);
    }
    asssingValues();
  }, [loading]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    if (imageRequired) formData.append("image", data.image);

    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("body", data.body);

    try {
      const responseData = await updatePost(post._id, formData);
      if (responseData) handleOpen();
    } catch (error) {}
  });

  const onChange = (file) => {
    setValue("image", file);
    setImageRequired(true);
  };

  const onOptionChange = (op) => {
    setValue("type", op);
  };

  const handleAction = (opc) => {
    handleOpen();
    navigate("/posts/edit");
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {post ? (
            <div className="bg-white pt-6 pb-8 mt-5">
              <HeaderTittle title={"Editar publicación"} />
              <div className="m-10 overflow-hidden">
                <AnimatePresence mode="sync">
                  {updatePostErrors.map((error, i) => (
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

              <form
                onSubmit={onSubmit}
                className={`grid ${
                  isMobile ? "grid-cols-1" : "grid-cols-2 mx-10"
                } gap-10 font-montserrat`}
              >
                <div className="flex flex-col items-center gap-5">
                  <div className="w-1/2">
                    <p className="font-bold text-xl">Título del contenido:</p>
                    <div className={errors.title ? "-mb-5" : "mb-1"}>
                      <input
                        type="text"
                        placeholder="Ingresa un título llamativo..."
                        {...register("title", {
                          required: "Se requiere un título",
                          pattern: {
                            value: /^[a-zA-Z0-9\s.,¿?-_!¡"]+$/,
                            message:
                              'Solo se permiten letras, números, espacios y los signos (¿ ? _ - ! ¡ , . ")',
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
                        maxLength={40}
                        minLength={6}
                        className={`shadow border py-1 px-3 w-full ${
                          errors.title
                            ? "border-red-500 placeholder-red-500"
                            : "border-black placeholder-blue-gray-200"
                        }`}
                      />
                      {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="font-bold text-xl">Tipo de contenido:</p>
                    <div className={errors.type ? "-mb-5" : "mb-1"}>
                      <InputSelect
                        onOptionChange={onOptionChange}
                        options={options}
                        register={register}
                        defaultValue={post.type}
                      />
                      {errors.type && (
                        <p className="text-red-500">
                          Se requiere seleccionar un tipo
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="font-bold text-xl">
                      Cuerpo de la publicación:
                    </p>
                    <div className={errors.body ? "-mb-5" : "mb-1"}>
                      <textarea
                        {...register("body", {
                          required:
                            "Se requiere la información de la publicación",
                          pattern: {
                            value: /^[a-zA-Z0-9\s.,;¿?_!¡\-%"#]+$/,
                            message:
                              'Solo se permiten letras, números, espacios y los signos (¿ ? _ - ! ¡ , . % " # $)',
                          },
                        })}
                        className={`w-full text-black px-4 py-2 rounded-md border resize-none shadow ${
                          errors.body
                            ? "border-red-500 placeholder-red-500"
                            : "border-black placeholder-blue-gray-200"
                        }`}
                        placeholder="..."
                        rows={8}
                      ></textarea>
                      {errors.body && (
                        <p className="text-red-500">{errors.body.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <div className="flex items-center gap-5">
                    <p className="font-bold text-xl">Cargar imagen:</p>
                    {errors.image && (
                      <p className="text-red-500">Se requiere una imagen</p>
                    )}
                  </div>
                  <div className="w-1/2 flex items-center h-[22rem]">
                    <Controller
                      name="image"
                      control={control}
                      rules={{ required: imageRequired }}
                      render={({ field: { ref, ...field } }) => (
                        <UploadImage
                          {...field}
                          defaultImage={imageUrl + post.image}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <div
                  className={`${
                    isMobile ? "" : "col-span-2"
                  } flex justify-center`}
                >
                  <motion.div className="w-72 flex" whileTap={{ scale: 0.95 }}>
                    <div
                      to="#"
                      className="bg-white border-[#6d1610] border-2 p-1 rounded-full w-full"
                    >
                      <button
                        className="bg-[#6d1610] text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
                        type="submit"
                      >
                        Editar
                      </button>
                    </div>
                  </motion.div>
                </div>
              </form>
            </div>
          ) : (
            <div>No se encontró la publicación.</div>
          )}
        </>
      )}
      <DialogMessage
        handleOpen={handleOpen}
        open={open}
        handleAction={handleAction}
        buttonCancel={false}
        title="Aviso"
        message="¡Publicación editada exitosamente!"
      />
    </div>
  );
}

export default EditPost;
