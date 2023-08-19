export const formatCurrency = (price) => {
  let pounds = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return pounds.format(price);
};
