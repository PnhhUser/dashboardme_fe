import {
  DASHBOARD_ROUTE,
  DATA_ROUTE,
  SETTINGS_ROUTE,
  WAREHOUSE_ROUTE,
} from '../const/route.const';

export interface IMenuDrawer {
  content: string;
  url: string;
  isDisable: boolean;
  icon: string;
}

export const MENU_DRAWER: IMenuDrawer[] = [
  {
    url: '/' + DASHBOARD_ROUTE,
    content: 'dashboard.title',
    isDisable: false,
    icon: 'appstore',
  },
  {
    url: '/' + WAREHOUSE_ROUTE,
    content: 'warehouse.title',
    isDisable: false,
    icon: 'inbox',
  },
  {
    url: '/' + DATA_ROUTE,
    content: 'data.title',
    isDisable: false,
    icon: 'database',
  },
  {
    url: '/' + SETTINGS_ROUTE,
    content: 'settings.title',
    isDisable: false,
    icon: 'setting',
  },
];
