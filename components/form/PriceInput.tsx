import { Input } from "../ui/input"
import { Label } from "../ui/label"



interface PriceFormatProps {
  name?:string,
  defaultValue?:number
}

function PriceInput({name,defaultValue}:PriceFormatProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name || 'price'} className="mb-2 font-semibold">
        السعر (دينار عراقي)
      </Label>
      <Input
        id={name || 'price'}
        type="number"
        name={name || 'price'}
        min={0}
        defaultValue={defaultValue || 100}
        required
        className="h-11 rounded-none border-2"
      />
    </div>
  )
}

export default PriceInput
