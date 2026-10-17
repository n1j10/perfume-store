import { LuBadgeCheck, LuCreditCard, LuGift, LuTruck } from "react-icons/lu";

const promises = [
  { icon: LuBadgeCheck, title: "منتجات أصلية", text: "عطور مضمونة 100%" },
  { icon: LuTruck, title: "توصيل سريع", text: "لكل محافظات العراق" },
  { icon: LuCreditCard, title: "دفع آمن", text: "عبر بوابة كي كارد" },
  { icon: LuGift, title: "تغليف هدايا", text: "لكل المناسبات" },
];

// The 2px gap over a dark background draws the grid lines between cells.
function Promises() {
  return (
    <section className="mt-14 grid grid-cols-2 gap-0.5 border-2 border-foreground bg-foreground lg:grid-cols-4">
      {promises.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-3 bg-background p-4 sm:p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center bg-saffron text-saffron-foreground">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold">{title}</p>
            <p className="text-xs text-muted-foreground">{text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Promises;
