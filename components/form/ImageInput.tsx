import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function ImageInput({ name = "image" }: { name: string }) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='mb-2 font-semibold'>
        الصورة
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
        className='h-11 rounded-none border-2 border-dashed pt-2' />
    </div>
  )
}

export default ImageInput
