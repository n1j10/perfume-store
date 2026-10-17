import Link from "next/link";

const stats = [
  { value: "+25", label: "عطرًا مختارًا" },
  { value: "6", label: "أقسام متنوعة" },
  { value: "18", label: "محافظة نوصل إليها" },
];

function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl">
      <p className="text-xs font-semibold text-primary">من نحن</p>
      <h1 className="mt-2 font-display text-5xl font-bold leading-tight sm:text-7xl">
        نحن نعشق{" "}
        <span className="inline-block -rotate-2 bg-saffron px-4 text-saffron-foreground">العطور</span>
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-5 text-lg leading-9 text-muted-foreground">
          <p>
            بدأت عَبَق من شغف بسيط برائحة العود في مجالس بيوتنا، وتحولت إلى متجر يجمع أجود العطور الشرقية والعصرية في مكان واحد.
          </p>
          <p>
            نختار كل منتج بعناية، من دهن العود المعتّق والبخور الممزوج يدويًا إلى العطور الرجالية والنسائية، ونحرص على أن يصل إليكم أصليًا ومغلفًا بأناقة.
          </p>
        </div>

        <div className="grid gap-0.5 self-start border-2 border-foreground bg-foreground">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-5">
              <p className="ltr-nums font-display text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/products"
        className="mt-12 inline-flex h-12 items-center bg-foreground px-8 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        اكتشف تشكيلتنا
      </Link>
    </section>
  );
}
export default AboutPage;
