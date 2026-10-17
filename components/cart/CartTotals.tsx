import { formatCurrency } from "@/utils/format";
import { createOrderAction } from "@/utils/api";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { Cart } from "@/utils/type";
import { LuLock } from "react-icons/lu";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, orderTotal } = cart;
  return (
    <div className="border-2 border-foreground bg-card">
      <h2 className="border-b-2 border-foreground bg-secondary px-6 py-4 font-display text-xl font-bold">
        ملخص الطلب
      </h2>
      <div className="space-y-3 px-6 py-5">
        <CartTotalRow label="المجموع الفرعي" amount={cartTotal} />
        <p className="flex justify-between text-sm">
          <span className="text-muted-foreground">التوصيل</span>
          <span className="font-semibold text-primary">مجاني</span>
        </p>
        <div className="h-0.5 bg-foreground/15" />
        <CartTotalRow label="الإجمالي" amount={orderTotal} lastRow />
      </div>
      <div className="px-6 pb-6">
        <FormContainer action={createOrderAction}>
          <SubmitButton
            text="ادفع عبر كي كارد"
            className="mt-0 h-12 w-full rounded-none bg-foreground text-base text-background hover:bg-primary hover:text-primary-foreground"
          />
        </FormContainer>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <LuLock className="h-3.5 w-3.5" />
          دفع آمن ومشفّر بالكامل
        </p>
      </div>
    </div>
  );
}

interface CartTotalRowType {
  label: string;
  amount: number;
  lastRow?: boolean;
}
function CartTotalRow({ label, amount, lastRow }: CartTotalRowType) {
  return (
    <p className={lastRow ? "flex justify-between text-lg font-bold" : "flex justify-between text-sm"}>
      <span className={lastRow ? "" : "text-muted-foreground"}>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default CartTotals;
