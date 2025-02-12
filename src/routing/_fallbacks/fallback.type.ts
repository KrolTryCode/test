import { logo } from '~/utils/configuration/design/logo';

export interface FallbackPageProps {
  pageType: FallbackPageType;
  buttonNavigate?: ButtonNavigate;
  showButton?: boolean;
  showLogo?: boolean;
  logoKey?: keyof typeof logo;
  createNodeAction?: () => void;
}

export enum FallbackPageType {
  WorkInProgress = 'WORK_IN_PROGRESS',
  NotFoundPage = 'NOT_FOUND_PAGE',
  NotFoundTask = 'NOT_FOUND_TASK',
  Forbidden = 'FORBIDDEN',
  BadReport = 'BAD_REPORT',
  NotFoundLogs = 'NOT_FOUND_LOGS',
  NotFoundOrders = 'NOT_FOUND_ORDERS',
  NotFoundNodes = 'NOT_FOUND_NODES',
  ServerConnectionError = 'SERVER_CONNECTION_ERROR',
  EmptyTable = 'EMPTY_TABLE',
  EmptyDirectory = 'EMPTY_DIRECTORY',
}

export enum ButtonNavigate {
  Back = 'BACK',
  ToMain = 'TO_MAIN',
  CreateNode = 'CREATE_NODE',
}
