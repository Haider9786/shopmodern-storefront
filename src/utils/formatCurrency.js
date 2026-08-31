export const formatCurrency = (amount) => {
  if (typeof amount === 'number') {
    return `$${amount.toFixed(2)}`;
  }
  if (typeof amount === 'string') {
    const num = parseFloat(amount);
    if (!isNaN(num)) {
      return `$${num.toFixed(2)}`;
    }
  }
  return '$0.00';
};