const getTotal = list => {
  var totalPrice = 0;
  for (let i = 0; i < list.length; i++) {
    totalPrice += parseFloat(list[i].price * list[i].quantity);
  }
  totalPrice = totalPrice.toFixed(2);
  return totalPrice;
};

const renameObjectKey = (obj, oldKey, newKey) => {
  Object.defineProperty(obj, newKey,
    Object.getOwnPropertyDescriptor(obj, oldKey));
  delete obj[oldKey]
}

export { getTotal, renameObjectKey };
