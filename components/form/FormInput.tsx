import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FormInputProps {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
};

function FormInput({ name, type, label, defaultValue, placeholder }: FormInputProps) {
    return (
        <div className='mb-2'>
            <Label htmlFor={name} className='mb-2 font-semibold'>
                {label || name}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required
                className='h-11 rounded-none border-2'
            />
        </div>
    )
}

export default FormInput
