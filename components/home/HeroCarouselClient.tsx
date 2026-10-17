"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface HeroSlide {
  id: string;
  title?: string;
  image: string;
}

interface HeroCarouselClientProps {
  items: HeroSlide[];
}

export default function HeroCarouselClient({ items }: HeroCarouselClientProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full">
      {/* offset frame behind the slider */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-foreground bg-saffron" aria-hidden />
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: "start",
          direction: "rtl",
        }}
        className="relative h-full border-2 border-foreground bg-muted"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id || index}>
              <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[540px]">
                <Image
                  src={item.image}
                  alt={item.title || `شريحة ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1023px) 100vw, 60vw"
                />
                {item.title && (
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-background/90 px-5 py-4 backdrop-blur">
                    <h3 className="font-display text-lg font-bold sm:text-2xl">
                      {item.title}
                    </h3>
                    <span className="ltr-nums shrink-0 text-xs font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="start-3 top-4 bottom-auto my-0 rounded-none border-2 border-foreground bg-background" />
        <CarouselNext className="start-12 top-4 bottom-auto my-0 rounded-none border-2 border-foreground bg-background" />
      </Carousel>
    </div>
  );
}
