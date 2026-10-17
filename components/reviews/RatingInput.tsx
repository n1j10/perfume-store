import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '../ui/label';



interface RatingInputProps {
  name: string;
  labelText?: string;
}
function RatingInput({ name, labelText }: RatingInputProps) {

  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  }).reverse();

  return (
    <div className='mb-4 flex max-w-xs items-center gap-4'>
      <Label>
        {labelText || 'التقييم'}
      </Label>

      <Select defaultValue={numbers[0]} name={name} required>
        <SelectTrigger className='w-32'>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {numbers.map((num) => (
            <SelectItem key={num} value={num}>
              {'★'.repeat(Number(num))} ({num})
            </SelectItem>
          ))}
        </SelectContent>

      </Select>

    </div>
  )
}

export default RatingInput
