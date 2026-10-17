import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, ArrowLeft, ShoppingBag, ListOrdered } from 'lucide-react';

interface PaymentResultProps {
  searchParams: Promise<{
    status?: string;
    paymentId?: string;
    orderId?: string;
  }>;
}

export default async function PaymentResultPage({ searchParams }: PaymentResultProps) {
  const params = await searchParams;
  const status = (params.status || '').toLowerCase();
  const isSuccess = status === 'success';
  const paymentId = params.paymentId;
  const orderId = params.orderId;

  const statusLabel = isSuccess ? 'ناجحة' : status ? 'فاشلة' : 'غير معروفة';

  return (
    <div className='flex min-h-[60vh] items-center justify-center py-8'>
      <div className='w-full max-w-lg border-2 border-foreground bg-card'>
        <div className={cn('flex flex-col items-center gap-3 border-b-2 border-foreground px-6 py-10 text-center', isSuccess ? 'bg-primary text-primary-foreground' : 'bg-destructive text-white')}>
          {isSuccess ? <CheckCircle2 className='h-14 w-14' /> : <XCircle className='h-14 w-14' />}
          <h1 className='font-display text-3xl font-bold'>
            {isSuccess ? 'تم الدفع بنجاح!' : 'فشلت عملية الدفع'}
          </h1>
          <p className='max-w-sm text-sm opacity-90'>
            {isSuccess
              ? 'اكتملت عمليتك عبر كي كارد بنجاح، شكرًا لتسوقك من عَبَق.'
              : 'تعذّرت معالجة الدفع. يرجى التحقق من بطاقتك أو المحاولة مرة أخرى.'}
          </p>
        </div>

        <dl className='space-y-3 px-6 py-6 text-sm'>
          <div className='flex justify-between gap-4'>
            <dt className='text-muted-foreground'>طريقة الدفع</dt>
            <dd className='font-semibold'>بوابة كي كارد</dd>
          </div>
          <div className='flex justify-between gap-4'>
            <dt className='text-muted-foreground'>الحالة</dt>
            <dd className={cn('font-semibold', isSuccess ? 'text-primary' : 'text-destructive')}>{statusLabel}</dd>
          </div>
          {paymentId && (
            <div className='flex justify-between gap-4'>
              <dt className='whitespace-nowrap text-muted-foreground'>رقم الدفع</dt>
              <dd className='ltr-nums max-w-[200px] truncate font-mono text-xs' title={paymentId}>{paymentId}</dd>
            </div>
          )}
          {orderId && (
            <div className='flex justify-between gap-4'>
              <dt className='whitespace-nowrap text-muted-foreground'>رقم الطلب</dt>
              <dd className='ltr-nums max-w-[200px] truncate font-mono text-xs' title={orderId}>{orderId}</dd>
            </div>
          )}
        </dl>

        <div className='grid gap-0.5 border-t-2 border-foreground bg-foreground sm:grid-cols-2'>
          <Link
            href='/orders'
            className='flex h-12 items-center justify-center gap-2 bg-background text-sm font-semibold transition-colors hover:bg-secondary'
          >
            <ListOrdered className='h-4 w-4' />
            عرض طلباتي
          </Link>
          <Link
            href={isSuccess ? '/products' : '/cart'}
            className='flex h-12 items-center justify-center gap-2 bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90'
          >
            {isSuccess ? (
              <>
                <ShoppingBag className='h-4 w-4' />
                متابعة التسوق
              </>
            ) : (
              <>
                العودة إلى السلة
                <ArrowLeft className='h-4 w-4' />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
