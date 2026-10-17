import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="grid gap-4 pt-16">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="h-28 w-full rounded-none" />
      ))}
    </div>
  );
}

export default loading;
