"use client";
import { useState } from "react";

import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import {
  removeCartItemAction,
} from "@/utils/api";
import SelectProductAmount, {
  Mode,
} from "../single-prodcut/SelectProductAmount";

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity);

  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    // const result = await updateCartItemAction({amount: value,cartItemId: id});
    setAmount(value);
    setIsLoading(false);
  };

  return (
    <div className="col-start-2 flex items-center gap-4 md:col-start-auto">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton
          size="sm"
          variant="link"
          className="mt-0 px-0 text-destructive underline underline-offset-4"
          text="حذف"
        />
      </FormContainer>
    </div>
  );
}
export default ThirdColumn;
