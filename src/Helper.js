const getTotal = list => {
  var totalPrice = 0;
  for (let i = 0; i < list.length; i++) {
    totalPrice += parseFloat(list[i].price * list[i].quantity);
  }
  totalPrice = totalPrice.toFixed(2);
  return totalPrice;
};

export { getTotal };
