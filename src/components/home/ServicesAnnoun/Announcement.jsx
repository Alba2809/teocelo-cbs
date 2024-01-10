import { Carousel, IconButton } from "@material-tailwind/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { usePosts } from "../../../context/PostContext";
import { useExtaData } from "../../../context/ExtraDataContext";

function Announcement() {
  const { posts } = usePosts();
  const { imageUrl } = useExtaData()
  const { isMobile } = useExtaData()

  return (
    <div className="flex flex-col">
      <div className="font-extrabold text-center text-2xl lg:text-4xl pt-5 pb-20">
        CONVOCATORIAS
      </div>
      <div className={`grow flex justify-center ${isMobile ? "items-start" : "items-center"}`}>
        <div className={`flex items-center justify-center rounded-xl shadow-md shadow-[#d5d5d5] ${isMobile ? "h-[70%] px-5" : "h-full w-[50%]"}`}>
          {posts.filter((post) => post.type === "Convocatoria").length > 0 ? (
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
              className="w-full lg:w-[90%] z-0"
              autoplay={true}
              loop={true}
            >
              {posts
                .filter((post) => post.type === "Convocatoria")
                .map((post, i) => (
                  <div className="flex justify-center items-center h-full w-full" key={i}>
                      <img
                        src={imageUrl + post.image}
                        alt={"Imagen de la convocatoria: " + post.title}
                        className="h-full py-8"
                      />
                    
                  </div>
                ))}              
            </Carousel>
          ) : (
            <>No hay convocatorias</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
