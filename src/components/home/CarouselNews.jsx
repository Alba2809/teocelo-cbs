import ComponentNew from "../post/ComponentNew";
import { Carousel } from "@material-tailwind/react";
import { useExtaData } from "../../context/ExtraDataContext";
import { usePosts } from "../../context/PostContext";

function CarouselImages() {
  const { isMobile } = useExtaData();
  const { posts } = usePosts();
  let newsCom = [];

  const sliceArray = () => {
    const conditional = ["Noticia", "Comunicado"];
    newsCom = posts.filter((post) => (post) => conditional.includes(post.type));
    if (newsCom.length > 5) {
      const _posts = newsCom.slice(0, 5);
      _posts.push({ position: "More" });
      return _posts;
    } else {
      const _posts = newsCom;
      _posts.push({ position: "More" });
      return _posts;
    }
  };
  const newsSliced = sliceArray();

  const organizedNews = newsSliced.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / (isMobile ? 2 : 3));

    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }

    acc[groupIndex].push(curr);
    return acc;
  }, []);

  return (
    <div className="bg-[#efeeee]">
      <div className="w-full px-8 pt-10">
        <div className="flex items-center">
          <hr className="flex-1 border-t border-[#494848] border" />
          <span className="px-4 text-center font-montserrat font-extrabold text-black text-2xl lg:text-3xl">
            NOTICIAS Y COMUNICADOS
          </span>
          <hr className="flex-1 border-t border-[#494848] border" />
        </div>
      </div>
      {posts.length === 0 ? (
        <div
        className={`h-[30rem] flex items-center justify-center font-montserrat font-extrabold text-2xl`}
      >
        No hay noticias o comunicados
      </div>
      ) : (
        <Carousel autoplay={true} loop={true} className="z-0">
          {organizedNews.map((group, groupIndex) => (
            <div key={groupIndex} className={`flex h-full w-full px-4 mb-5`}>
              {group.map((new_, index) => (
                <div
                  key={index}
                  className={`grow p-10 h-full ${
                    group.length === 1
                      ? isMobile
                        ? "basis-1/2"
                        : "basis-1/3"
                      : "basis-full"
                  }`}
                >
                  <ComponentNew newComponent={new_} />
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselImages;
