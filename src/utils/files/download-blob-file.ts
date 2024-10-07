export const downloadBlobFile = (data: string, filename: string, type: string) => {
  const blob = new Blob(['\ufeff', data], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = type === 'log' ? filename : `${filename}.${type}`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
