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

function ComponentPostEdit({ newComponent }) {
  const { imageUrl } = useExtaData();
  const urlImage = imageUrl + newComponent.image;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate;
  };

  return (
    <div className="w-full h-full">
      <Card className="h-full">
        <CardHeader className="relative h-[260px] w-full mx-0 -mt-0 rounded-b-none">
          <img
            src={urlImage}
            alt="Imagen"
            className="w-full rounded-t-2xl h-full"
          />
        </CardHeader>
        <CardBody className="grow">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-montserrat text-[#494848] text-base lg:text-xl"
          >
            {newComponent.title}
          </Typography>
          <p className="font-montserrat text-[#A3A3A2] line-clamp-5">
            {newComponent.body}
          </p>
        </CardBody>
        <CardFooter className="px-6 py-4 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center content-end h-full w-full gap-2">
            <div className="flex items-center justify-center lg:justify-normal">
              <AiOutlineClockCircle />
              <span className="font-montserrat text-black text-xs ml-2">
                {formatDate(newComponent.createdAt)}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Link
                to={"/posts/" + newComponent.title}
                className="bg-[#6d1610] text-white rounded-2xl py-1 px-5 font-montserrat w-full lg:w-2/3 justify-self-end text-center"
              >
                Leer más
              </Link>
              <Link to={"/posts/edit/" + newComponent.title} className="bg-[#6d1610] text-white rounded-2xl py-1 px-5 font-montserrat w-full lg:w-2/3 justify-self-end text-center">
                Editar
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ComponentPostEdit;
