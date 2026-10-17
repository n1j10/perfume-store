"use client"
import { useFormStatus } from "react-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";



function FavSubmitButton({isFav}:{isFav: boolean}) {

  const {pending} = useFormStatus();

  return (
      <button
        type='submit'
        aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        className={cn(
          'grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-colors hover:text-destructive',
          isFav ? 'text-destructive' : 'text-foreground'
        )}
      >
        {pending ? ( <Loader2Icon className="h-4 w-4 animate-spin" />
        ): isFav ? <FaHeart /> : <FaRegHeart />}
      </button>
  )
}

export default FavSubmitButton
