import { fetchAllCategories } from "@/utils/api";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

async function CategoryInput({
  defaultValue,
}: {
  defaultValue?: string | null;
}) {
  const categories = await fetchAllCategories();

  return (
    <div className="mb-2">
      <Label htmlFor="categoryId" className="mb-2 font-semibold">
        القسم
      </Label>

      <Select
        id="categoryId"
        name="categoryId"
        defaultValue={defaultValue || ""}
        required
      >
        <SelectTrigger className="h-11 w-full min-w-0 rounded-none border-2 border-input bg-transparent px-2.5 text-sm">
          <SelectValue placeholder="اختر القسم" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CategoryInput;
