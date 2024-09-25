function sumTotal(params) {
  let total = 0;

  for (const data of params) {
    total = total + data.Total;
  }

  return total;
}

module.exports = {
  sumTotal
};
