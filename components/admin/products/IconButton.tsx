"use client"
import { Edit2, Loader2Icon, Trash2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from "react-dom";
import { Button } from '../../ui/button';


type actionType = 'delete' | 'edit'



function IconButton({ actionType }: { actionType: actionType }) {

    const { pending } = useFormStatus();

    const renderIcon = () => {
        switch (actionType) {
            case 'delete':
                return <Trash2 className='text-destructive' size={18} />
            case 'edit':
                return <Edit2 className='text-primary' size={18} />
            default: throw new Error("invalid Action Type")
        }
    }


    return (
        <Button
            type='submit'
            size={'icon'}
            variant={'outline'}
            aria-label={actionType === 'delete' ? 'حذف' : 'تعديل'}
            className={'cursor-pointer rounded-none border-2'}
        >
            {
                pending ? <Loader2Icon className='  animate-spin' /> : renderIcon()
            }
        </Button>
    )
}

export default IconButton