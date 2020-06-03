export function percentageFromNumber(number: number, total: number) {
  return (number / total) * 100;
}

export function numberWithDecimal(number: number) {
  return number > 0 ? number.toFixed(1) : 0;
}
