import { RequestParams } from './api-requests';

export const getDownloadHeaderCSV = (): RequestParams => ({
  headers: {
    accept: 'text/csv',
  },
});
