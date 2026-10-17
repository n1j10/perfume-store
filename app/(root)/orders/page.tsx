import Link from "next/link";
import SectionTitle from "@/components/global/SectionTitle";
import EmptyList from "@/components/global/EmptyList";
import { fetchUserOrders, payOrderAction } from "@/utils/api";
import { formatCurrency, formatDate, formatTime } from "@/utils/format";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { CheckCircle2, Clock3 } from "lucide-react";

async function OrdersPage() {
  const orders = await fetchUserOrders();

  if (orders.length === 0)
    return (
      <EmptyList title="لا توجد طلبات بعد" description="عندما تطلب منتجًا سيظهر هنا مع حالة الدفع.">
        <Link
          href="/products"
          className="mt-2 inline-flex h-10 items-center bg-foreground px-5 text-sm font-semibold text-background"
        >
          ابدأ التسوق
        </Link>
      </EmptyList>
    );

  return (
    <>
      <SectionTitle eyebrow={`إجمالي الطلبات: ${orders.length}`} text="طلباتي" />

      <div className="grid gap-4">
        {orders.map((order) => {
          const { id, products, orderTotal, createdAt, product, isPaid } = order;
          return (
            <article
              key={id}
              className="grid gap-4 border-2 border-foreground bg-card p-5 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold">{product.name}</h3>
                  {isPaid ? (
                    <span className="inline-flex items-center gap-1 bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" /> مدفوع
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-saffron px-2.5 py-0.5 text-xs font-semibold text-saffron-foreground">
                      <Clock3 className="h-3.5 w-3.5" /> بانتظار الدفع
                    </span>
                  )}
                </div>
                <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">الكمية</dt>
                    <dd className="font-semibold">{products}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">المبلغ</dt>
                    <dd className="font-semibold text-primary">{formatCurrency(orderTotal)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">التاريخ</dt>
                    <dd className="font-semibold">{formatDate(createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">الوقت</dt>
                    <dd className="font-semibold">{formatTime(createdAt)}</dd>
                  </div>
                </dl>
              </div>

              {!isPaid && (
                <FormContainer action={payOrderAction}>
                  <input type="hidden" name="orderId" value={id} />
                  <SubmitButton
                    text="ادفع عبر كي كارد"
                    className="mt-0 h-11 w-full rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground sm:w-auto"
                  />
                </FormContainer>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
export default OrdersPage;
