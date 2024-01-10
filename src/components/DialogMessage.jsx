import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import IconoX from "../assets/Icons/IconoX.png";

function DialogMessage({
  handleOpen,
  open,
  handleAction,
  buttonCancel,
  title,
  message,
}) {
  const handleClickAccept = () => {
    handleOpen();
    handleAction(true);
  };

  const handleClickCancel = () => {
    handleOpen();
    handleAction(false);
  };

  return (
    <Dialog open={open} handler={handleOpen} size="md" className="bg-[#EFEFEF]">
      <DialogHeader>
        <div className="w-full bg-[#6D1610] rounded-md font-montserrat font-extrabold text-2xl text-white h-12 text-center flex items-center justify-center relative">
          <p>{title}</p>
          <button
            className="absolute right-0 inset-y-0 mt-1"
            onClick={handleClickCancel}
          >
            <img
              src={IconoX}
              alt="Icono de la marca X"
              className="w-[70%] lg:w-[80%]"
            />
          </button>
        </div>
      </DialogHeader>
      <DialogBody>
        <div className="font-montserrat font-bold text-xl text-black min-h-[4rem] flex items-center justify-center">
          {message}
        </div>
      </DialogBody>
      <DialogFooter>
        <div
          className={`flex flex-wrap w-full gap-5 ${
            buttonCancel ? "justify-between" : "justify-center"
          }`}
        >
          {buttonCancel && (
            <div className="bg-white border-black border-2 p-1 rounded-full basis-1/3">
              <button
                onClick={handleClickCancel}
                className="bg-black text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
                type="submit"
              >
                Cancelar
              </button>
            </div>
          )}
          <div className="bg-white border-[#6D1610] border-2 p-1 rounded-full basis-1/3">
            <button
              onClick={handleClickAccept}
              className="bg-[#6D1610] text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

export default DialogMessage;
