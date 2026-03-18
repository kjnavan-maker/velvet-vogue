const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

export default formatCurrency;