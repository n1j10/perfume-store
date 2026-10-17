import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

export const FirstColumn = ({name,image}: {image: string;name: string;}) => {
  return (
    <div className='relative row-span-2 h-28 w-24 border-2 border-foreground bg-muted sm:h-32 sm:w-28 md:row-span-1'>
      <Image
        src={image}
        alt={name}
        fill
        sizes='112px'
        priority
        className='object-cover'
      />
    </div>
  );
};


export const SecondColumn = ({name,productId,description}: {name: string;description:string;productId: string;}) => {
  return (
    <div className='min-w-0'>
      <Link href={`/products/${productId}`}>
        <h3 className='font-display text-lg font-bold hover:text-primary'>{name}</h3>
      </Link>
      {description && <p className='mt-1 line-clamp-2 text-xs leading-6 text-muted-foreground'>{description}</p>}
    </div>
  );
};



export const FourthColumn = ({ price }: { price: number }) => {
  return <p className='col-start-2 text-lg font-bold text-primary md:col-start-auto md:min-w-28 md:text-end'>{formatCurrency(price)}</p>;
};
