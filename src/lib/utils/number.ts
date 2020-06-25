export function percentageFromNumber(number: number, total: number) {
  return (number / total) * 100;
}

export function numberWithDecimal(number: number) {
  return number > 0 ? number.toFixed(1) : 0;
}

export function ratioToPercentage(ratio: string) {
  const [first, second] = ratio.split('/');

  const aspectRatioAsPercentage =
    (parseInt(second, 10) / parseInt(first, 10)) * 100;

  return aspectRatioAsPercentage;
}

export function getWidthFromMaxHeight(
  width: number,
  height: number,
  maxHeight: number,
) {
  const ratio = width / height;

  return maxHeight * ratio;
}
