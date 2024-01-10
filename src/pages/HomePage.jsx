import { useEffect } from "react";
import CarouselImages from "../components/home/CarouselImages";
import CarouselNews from "../components/home/CarouselNews";
import NumbersReports from "../components/home/NumbersReports";
import ServicesAnnouncement from "../components/home/ServicesAnnouncement";
import { usePosts } from "../context/PostContext";

function HomePage() {
  const { getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <CarouselImages />
      <CarouselNews />
      <ServicesAnnouncement />
      <NumbersReports />
    </div>
  );
}

export default HomePage;
