import { Carousel, IconButton } from "@material-tailwind/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useExtaData } from "../../../context/ExtraDataContext";
import Footer1 from "../../../assets/Extras/Footer1.png";
import Footer2 from "../../../assets/Extras/Footer2.png";


function TourismComponent({ data }) {
  const { isMobile } = useExtaData();

  return (
    <article
      className={`w-full shadow-inner font-montserrat text-black p-5 border-t-2 border-b-2 border-gray-200 relative flex ${
        isMobile ? "flex-col" : "justify-around"
      }`}
    >
      <Carousel
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block cursor-pointer rounded-full transition-all content-[''] w-3 h-3 ${
                  activeIndex === i
                    ? "bg-black"
                    : "bg-white border-black border"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 rounded-full"
          >
            <FiChevronLeft color="#000000" size="2em" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 rounded-full"
          >
            <FiChevronRight color="#000000" size="2em" />
          </IconButton>
        )}
        className={`z-0 ${isMobile ? "w-full mb-10" : "w-[30%]"} ${
          data.imageSide === "right" && !isMobile
            ? "order-last"
            : data.imageSide === "left" && !isMobile
            ? "order-first"
            : ""
        }`}
        autoplay={true}
        loop={true}
      >
        {data.images.map((image, i) => (
          <div key={i} className="w-full flex justify-center items-center">
            <img
              src={image}
              alt={`Image de atractivo turístico - ${i}`}
              className={`w-[350px] rounded-xl`}
            />
          </div>
        ))}
      </Carousel>
      <div className={`${isMobile ? "w-ful px-5 pb-5" : "w-[60%]"}`}>
        <h2
          className={`font-extrabold text-2xl ${
            data.imageSide === "left" && !isMobile
              ? "text-start"
              : data.imageSide === "right" && !isMobile
              ? "text-end"
              : "text-center"
          }`}
        >
          {data.title}
        </h2>
        <h3
          className={`font-semibold text-xl ${
            data.imageSide === "left" && !isMobile
              ? "text-start"
              : data.imageSide === "right" && !isMobile
              ? "text-end"
              : "text-center"
          }`}
        >
          Ubicación: {data.location}
        </h3>
        <br />
        <p className="font-normal text-lg text-justify">{data.p1}</p>
        <br />
        <p className="font-normal text-lg text-justify">{data.p2}</p>
      </div>
      <img
        src={Footer1}
        alt="Imagen esquina"
        className={`absolute top-0 lg:w-60 w-48 ${
          data.imageSide === "left" ? "right-0 scale-x-[-1]" : "left-0"
        }`}
      />
      <img
        src={Footer2}
        alt="Imagen esquina"
        className={`absolute bottom-0 lg:w-60 w-48 ${
          data.imageSide === "left" ? "right-0" : "left-0 scale-x-[-1]"
        }`}
      />
    </article>
  );
}

export default TourismComponent;
