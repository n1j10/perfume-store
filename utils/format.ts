

export const formatCurrency = (amount:number | null) => {

    const value = amount || 0;

    return new Intl.NumberFormat('ar-IQ',{
        style:'currency',
        currency:'IQD',
        maximumFractionDigits: 0,
    }).format(value)


}

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatTime = (date: Date | string) => {
  return new Intl.DateTimeFormat('ar-IQ', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Baghdad',
  }).format(new Date(date));
};
