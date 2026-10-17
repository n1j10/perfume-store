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
import { deleteProductAction, fetchAdminPosts } from "@/utils/api";
import { formatCurrency } from "@/utils/format";
import { links } from "@/utils/links";
import IconButton from "@/components/admin/products/IconButton";
import FormContainer from "@/components/form/FormContainer";

async function ProductsAdminPage() {
  const getPosts = await fetchAdminPosts();
  const total = getPosts.length;
  return (
    <section className="border-2 border-foreground bg-card">
      <Table>
        <TableCaption className="pb-4">إجمالي المنتجات: {total}</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-start font-bold">اسم المنتج</TableHead>
            <TableHead className="text-start font-bold">السعر</TableHead>
            <TableHead className="text-start font-bold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getPosts.map((product) => {
            const { id, name, price } = product;
            const formattedPrice = formatCurrency(price);
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Link
                    href={`${links.PRODUCTS.href}/${id}`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formattedPrice}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Link href={`${links.AdminProducts.href}/${id}/edit`} aria-label="تعديل">
                    <IconButton actionType={"edit"} />
                  </Link>
                  <DeleteProduct productId={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default ProductsAdminPage;

function DeleteProduct({ productId }: { productId: string }) {
  const delete_product = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={delete_product}>
      <IconButton actionType={"delete"} />
    </FormContainer>
  );
}
