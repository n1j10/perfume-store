import { fetchHeroes } from "@/utils/api";
import { unstable_rethrow } from "next/navigation";
import HeroCarouselClient, { HeroSlide } from "./HeroCarouselClient";

const defaultHeroImages: HeroSlide[] = [
  {
    id: "default-1",
    title: "عطور شرقية صُنعت لأجلك",
    image: "https://images.pexels.com/photos/2814832/pexels-photo-2814832.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900",
  },
  {
    id: "default-2",
    title: "زهور ناعمة لكل المواسم",
    image: "https://images.pexels.com/photos/8450248/pexels-photo-8450248.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900",
  },

];

async function HeroCarousel() {
  let heroes: HeroSlide[] = [];
  try {
    heroes = await fetchHeroes();
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching hero images:", error);
  }

  const items = heroes && heroes.length > 0 ? heroes : defaultHeroImages;

  return <HeroCarouselClient items={items} />;
}

export default HeroCarousel;
