export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  deleteCategoryAction,
  fetchAdminCategories,
} from "@/utils/api";
import IconButton from "@/components/admin/products/IconButton";
import FormContainer from "@/components/form/FormContainer";

async function CategoriesAdminPage() {
  const categories = await fetchAdminCategories();
  const total = categories.length;

  return (
    <section className="border-2 border-foreground bg-card">
      <Table>
        <TableCaption className="pb-4">إجمالي الأقسام: {total}</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-start font-bold">اسم القسم</TableHead>
            <TableHead className="text-start font-bold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const { id, title } = category;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/admin/category/${id}/edit`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {title}
                  </Link>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Link href={`/admin/category/${id}/edit`} aria-label="تعديل">
                    <IconButton actionType={"edit"} />
                  </Link>
                  <DeleteCategory categoryId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default CategoriesAdminPage;

function DeleteCategory({ categoryId }: { categoryId: string }) {
  const delete_category = deleteCategoryAction.bind(null, { categoryId });

  return (
    <FormContainer action={delete_category}>
      <IconButton actionType={"delete"} />
    </FormContainer>
  );
}
