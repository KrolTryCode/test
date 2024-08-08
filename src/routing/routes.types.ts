import { FC, ReactNode } from 'react';

import { MenuIcon } from './layouts/main/submenu/submenu.types';

export interface RouteDescription {
  element?: ReactNode;
  lazyElement?: () => Promise<{ default: FC }>;
  path?: string;
  isIndex?: boolean;
  /**
   * Список ролей, с которыми эта страница доступна
   */
  accessBy?: string[];
  menuDisplay?: MenuDisplay;
  children?: RouteDescription[];
  key?: string;
  /**
   * Используется для формирования заголовка страницы, если не совпадает с menuDisplay.label
   */
  title?: string;
}

/**
 * Используется для добавления пункта в меню или подменю
 */
export interface MenuDisplay {
  /**
   * Отображаемая иконка
   */
  icon?: MenuIcon;
  /**
   * Отображаемый текст
   */
  label: string;
}

export type RouteTitleMeta = {
  accessBy?: string[];
  menuDisplay?: MenuDisplay;
  title?: string;
};
