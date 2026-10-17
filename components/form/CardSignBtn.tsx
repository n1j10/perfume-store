import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart } from 'react-icons/fa'

//user -> !auth -> go to sign in

function CardSignBtn() {
  return (
    <SignInButton mode='modal'>
      <button
        type='button'
        aria-label='سجّل الدخول لإضافة المنتج إلى المفضلة'
        className='grid h-9 w-9 cursor-pointer place-items-center rounded-full text-foreground transition-colors hover:text-destructive'
      >
        <FaRegHeart />
      </button>
    </SignInButton>

  )
}

export default CardSignBtn
