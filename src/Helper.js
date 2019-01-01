// Iterate through the whole list and sums up the total price
const getTotal = list => {
  var totalPrice = 0;
  for (let i = 0; i < list.length; i++) {
    totalPrice += parseFloat(list[i].price * list[i].quantity);
  }
  totalPrice = totalPrice.toFixed(2);
  return totalPrice;
};

// Takes an obj in the first argument, oldkey you wanted to replace with on second argument
// and newKey name in the third argument.
const renameObjectKey = (obj, oldKey, newKey) => {
  Object.defineProperty(obj, newKey,
    Object.getOwnPropertyDescriptor(obj, oldKey));
  delete obj[oldKey]
}

// remove the current list
const handleRemoveList = (lists, currentListName) => {
  delete lists[currentListName];
  return lists
}

const getKeyValuesFromList = (lists, currentListName) => {
  var keys = Object.keys(lists);
  const index = keys.indexOf(currentListName);
    if (index > -1) {
      keys.splice(index , 1);
  }
  return keys
}

export { getTotal, renameObjectKey, handleRemoveList, getKeyValuesFromList };
