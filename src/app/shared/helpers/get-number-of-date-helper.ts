export function getNumberOfDays(dateFrom: string, dateTo: string): number {
  const startDate: Date = new Date(dateFrom);
  const endDate: Date = new Date(dateTo);

  // Tính số ngày chênh lệch
  const daysDifference: number = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return daysDifference;
}
