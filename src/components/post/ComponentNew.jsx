import { AiOutlineClockCircle } from "react-icons/ai";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useExtaData } from "../../context/ExtraDataContext";
import { Link } from "react-router-dom";
import IconoVerMas from "../../assets/Icons/IconoVerMas.png";

function ComponentNew({ newComponent, handleDetails }) {
  const { imageUrl, isMobile } = useExtaData();
  const urlImage = imageUrl + newComponent.image;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  const handleClickDetails = (post) => {
    if (handleDetails) handleDetails(post);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl">
      {newComponent.position ? (
        <Card className="max-h-[30rem] min-h-[30rem] flex justify-center items-center">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 font-montserrat text-[#494848] text-base lg:text-xl flex items-center"
            >
              <Link to="/posts">
                <img
                  src={IconoVerMas}
                  alt="Icono para ver más publicaciones"
                  className="h-full"
                />
              </Link>
            </Typography>
          </CardBody>
        </Card>
      ) : (
        <Card className="max-h-[30rem] min-h-[30rem]">
          <CardHeader
            className={`relative h-[11rem] w-full mx-0 -mt-0 rounded-b-none`}
          >
            <img
              src={urlImage}
              alt="Imagen"
              className="w-full rounded-t-2xl h-full"
            />
          </CardHeader>
          <CardBody className="h-full grow">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 font-montserrat text-[#494848] text-base lg:text-xl"
            >
              {newComponent.title}
            </Typography>
            <p
              className={`font-montserrat text-[#A3A3A2] line-clamp-3 lg:line-clamp-5 ${
                newComponent.body.includes(" ") ? "break-words" : "break-all"
              }`}
            >
              {newComponent.body}
            </p>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center content-end h-full w-full">
              <div
                className={`flex items-center ${
                  isMobile ? "justify-center" : "justify-normal"
                }`}
              >
                <AiOutlineClockCircle />
                <p className="font-montserrat text-black text-xs ml-2">
                  {formatDate(newComponent.createdAt)}
                </p>
              </div>

              <Link
                to={"/posts/" + newComponent.title}
                className="bg-[#6d1610] text-white text-center rounded-2xl py-1 px-5 font-montserrat w-full lg:w-2/3 justify-self-end mt-5 lg:mt-0"
              >
                Leer más
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default ComponentNew;
