export interface ErrorPageProps {
  pageType: ErrorPageType;
  buttonNavigate: ButtonNavigate;
  showButton?: boolean;
  showLogo?: boolean;
}

export enum ErrorPageType {
  WorkInProgress = 'WORK_IN_PROGRESS',
  NotFoundPage = 'NOT_FOUND_PAGE',
  NotFoundTask = 'NOT_FOUND_TASK',
  Forbidden = 'FORBIDDEN',
  BadReport = 'BAD_REPORT',
  NotFoundLogs = 'NOT_FOUND_LOGS',
  NotFoundOrders = 'NOT_FOUND_ORDERS',
  ServerConnectionError = 'SERVER_CONNECTION_ERROR',
}

export enum ButtonNavigate {
  Back = 'BACK',
  ToMain = 'TO_MAIN',
}
