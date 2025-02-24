export const calcFileSize = (byte: number) => {
  const _1024 = Math.pow(2, 10);

  if (byte < _1024) {
    return `${byte} байт`;
  }

  if (byte < Math.pow(_1024, 2)) {
    return `${(byte / _1024).toFixed(1)} КБ`;
  }

  if (byte < Math.pow(_1024, 3)) {
    return `${(byte / Math.pow(_1024, 2)).toFixed(1)} MБ`;
  }

  return `${(byte / Math.pow(_1024, 3)).toFixed(1)} ГБ`;
};
