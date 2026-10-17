import Link from "next/link";
import Image from "next/image";
import { fetchAllCategories } from "@/utils/api";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import { links } from "@/utils/links";

async function HomeCategories() {
  const categories = await fetchAllCategories();

  if (categories.length === 0)
    return <EmptyList className="mt-16" title="لا توجد أقسام متاحة حاليًا" />;

  return (
    <section className="pt-20">
      <SectionTitle eyebrow="اختر ذوقك" text="تسوّق حسب القسم" />
      <div className="no-scrollbar -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 md:grid-cols-6">
        {categories.map(({ id, title, image }) => (
          <Link
            key={id}
            href={`${links.PRODUCTS.href}?category=${id}`}
            className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-auto"
          >
            <span className="relative block aspect-square w-full overflow-hidden rounded-full border-2 border-foreground p-1 transition-colors group-hover:border-saffron">
              <span className="relative block h-full w-full overflow-hidden rounded-full bg-muted">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 639px) 112px, (max-width: 767px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
            </span>
            <span className="line-clamp-2 text-sm font-semibold leading-6 group-hover:text-primary">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomeCategories;
