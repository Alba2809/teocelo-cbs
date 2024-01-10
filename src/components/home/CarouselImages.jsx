import { Carousel, Typography } from "@material-tailwind/react";
import { usePosts } from "../../context/PostContext";
import { useExtaData } from "../../context/ExtraDataContext";

function CarouselImages() {
  const { posts } = usePosts();
  const { imageUrl } = useExtaData();
  const { isMobile } = useExtaData();

  return (
    <div className="bg-[#efeeee] mt-5 px-5">
      {posts.length > 0 ? (
        <Carousel
          className={`rounded-xl z-0 !overflow-y-hidden ${
            isMobile ? "h-[30rem]" : "h-[45rem]"
          }`}
          autoplay={true}
          loop={true}
        >
          {posts.map((post, i) => (
            <div className="relative h-full w-full" key={i}>
              <img
                src={imageUrl + post.image}
                alt={"Imagen de la publicacion: " + post.title}
                className="h-[full] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 grid h-1/3 lg:h-36 w-full place-items-center bg-black/75">
                <div className="w-3/4 text-center md:w-2/4">
                  <Typography
                    variant="h1"
                    color="white"
                    className="mb-4 text-xl lg:text-3xl font-montserrat"
                  >
                    {post.title}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div
          className={`${
            isMobile ? "h-[30rem]" : "h-[45rem]"
          } flex items-center justify-center font-montserrat font-extrabold text-2xl`}
        >
          No hay publicaciones
        </div>
      )}
    </div>
  );
}

export default CarouselImages;
