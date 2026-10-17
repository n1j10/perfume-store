import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(props: SelectProductAmountProps | SelectCartItemAmountProps) {

  const { mode, amount, setAmount } = props;

  const cartItem = mode === Mode.CartItem;

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm font-semibold'>الكمية</span>
      <Select
        value={amount.toString()}
        onValueChange={(value) => {
          if (value) setAmount(Number(value));
        }}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger className={cartItem ? 'w-20 rounded-none border-2 border-foreground' : 'h-11 w-28 rounded-none border-2 border-foreground'}>
          <SelectValue placeholder={amount.toString()} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={selectValue} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default SelectProductAmount;
