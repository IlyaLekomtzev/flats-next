export const formatMoney = (number: number) => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
}).format(number);

export const getMinValue = (number?: number, min = 0, max = 0) => {
  if (number === undefined || number < min) {
    return min;
  }

  if (number > max) {
    return max;
  }

  return number;
};

export const getMaxValue = (number?: number, min = 0, max = 0) => {
  if (number === undefined || number > max) {
    return max;
  }

  if (number < min) {
    return min;
  }

  return number;
};
