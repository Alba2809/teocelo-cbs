import { useEffect } from "react";
import { usePosts } from "../context/PostContext";
import { useParams } from "react-router-dom";
import { useExtaData } from "../context/ExtraDataContext";

function PostPage() {
  const { getPost, post } = usePosts();
  const { imageUrl, isMobile } = useExtaData();
  const params = useParams();

  useEffect(() => {
    const formattedTitle = encodeURIComponent(params.title);
    getPost(formattedTitle);
  }, []);

  return (
    <div>
      {post ? (
        <>
          <div
            className={`bg-[#efeeee] shadow-md shadow-[#b3b2b2] flex items-center justify-center ${
              isMobile
                ? "max-h-[25rem] min-h-[25rem]"
                : "max-h-[40rem] min-h-[40rem]"
            }`}
          >
            <img
              src={imageUrl + post.image}
              alt={"Imagen de la publicación: " + post.title}
              className={`${
                isMobile
                  ? "max-h-[20rem] min-h-[20rem]"
                  : "max-h-[35rem] min-h-[35rem]"
              } px-5`}
            />
          </div>
          <div className="mt-20 mb-20 mx-52">
            <h1 className="font-montserrat font-extrabold text-4xl text-center">
              {post.title}
            </h1>
            <p className="font-montserrat font-normal text-2xl text-justify mt-10">
              {post.body}
            </p>
          </div>
        </>
      ) : (
        <div>No se encontro la publicación.</div>
      )}
    </div>
  );
}

export default PostPage;
