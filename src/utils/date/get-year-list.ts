export const getYears = (startYear: number, totalYears: number): number[] => {
  const result: number[] = [];
  for (let deltaYears = 0; deltaYears < totalYears; deltaYears++) {
    result.push(startYear + deltaYears);
  }
  return result;
};
