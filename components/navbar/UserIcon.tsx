"use client"
import { useUser } from '@clerk/nextjs';
import { LuUser } from 'react-icons/lu';

function UserIcon() {
  const { user } = useUser();
  const profile_image = user?.imageUrl;

  if (profile_image) {
    return (
      <img src={profile_image} className='h-7 w-7 rounded-full object-cover' alt="صورة الحساب" />
    );
  }

  return (
    <span className='grid h-7 w-7 place-items-center rounded-full bg-saffron text-saffron-foreground'>
      <LuUser className='h-4 w-4' />
    </span>
  );
}
export default UserIcon;
