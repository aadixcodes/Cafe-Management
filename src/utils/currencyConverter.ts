
const RUPEE_EXCHANGE_RATE = 83.50; // As of 2024, 1 USD = ₹83.50

export const convertToRupees = (value: number): number => {
  return parseFloat((value * RUPEE_EXCHANGE_RATE).toFixed(2));
};

export const formatRupees = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
