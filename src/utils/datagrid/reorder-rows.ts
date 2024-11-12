export const reorderRows = <T>(initialIndex: number, newIndex: number, rows: T[]) => {
  const rowsClone = [...rows];
  const row = rowsClone.splice(initialIndex, 1)[0];
  rowsClone.splice(newIndex, 0, row);
  return rowsClone;
};
