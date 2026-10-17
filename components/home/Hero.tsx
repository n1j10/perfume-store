import Link from "next/link";
import { Suspense } from "react";
import { links } from "@/utils/links";
import NavSearch from "./HeroSearch";
import HeroCarousel from "./HeroCarousel";
import { LuArrowLeft } from "react-icons/lu";

function Hero() {
  return (
    <section className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col justify-center lg:col-span-5">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground px-3 py-1 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-saffron" />
          تشكيلة الموسم الجديدة
        </span>

        <h1 className="font-display text-5xl font-bold leading-[1.15] sm:text-6xl xl:text-7xl">
          عطرك
          <br />
          يحكي{" "}
          <span className="relative inline-block text-primary">
            قصتك
            <span className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-saffron/60 sm:h-4" aria-hidden />
          </span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
          من دهن العود المعتّق إلى البخور الممزوج يدويًا والعطور العصرية، اكتشف رائحة تشبهك وتبقى في الذاكرة.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={links.PRODUCTS.href}
            className="group inline-flex h-12 items-center gap-2 bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            تسوّق الآن
            <LuArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
          <Link
            href={links.ABOUT.href}
            className="inline-flex h-12 items-center border-2 border-foreground px-6 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            تعرّف علينا
          </Link>
        </div>

        <div className="mt-8 max-w-md">
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
      </div>

      <div className="lg:col-span-7">
        <HeroCarousel />
      </div>
    </section>
  );
}

export default Hero;
