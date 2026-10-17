'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { VscLoading } from "react-icons/vsc";
import { SignInButton } from "@clerk/nextjs";


type btnSize = 'default' | 'lg' | 'sm';

interface SubmitButtonProps {
  className?: string;
  text?: string;
  size?: btnSize;
  variant?: 'default' | 'outline' | 'link';
};

export function SubmitButton({ className = '', text = 'إرسال', size = 'lg', variant = 'default' }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn('mt-4 px-5 font-semibold', className)}
      size={size}
      variant={variant}
    >
      {pending ? (
        <>
          <VscLoading className='h-4 w-4 animate-spin' />
          يرجى الانتظار...
        </>
      ) : (
        text
      )}
    </Button>
  );
}


export default SubmitButton



export const ProductSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button type='button' size='lg' className='mt-6 h-12 w-full rounded-none text-base font-semibold'>
        سجّل الدخول للشراء
      </Button>
    </SignInButton>
  );
};
