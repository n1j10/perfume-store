import { LoadingContainer } from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/HeroProducts";
import Hero from "@/components/home/Hero";
import HomeCategories from "@/components/home/HomeCategories";
import Promises from "@/components/home/Promises";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Promises />
      <HomeCategories />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}
