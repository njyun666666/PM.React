import pmAPI from '../api/pmAPI';

export interface MenuViewModel {
  menuId: string;
  menuName: string;
  icon?: string;
  url?: string;
  children: MenuViewModel[];
}

export interface AuthMenuViewModel {
  menuId: string;
  parentMenuId: null | string;
  menuName: string;
  icon?: string;
  url?: string;
  enable: boolean;
  sort: number;
  children: AuthMenuViewModel[];
}

class MenuService {
  getMenu() {
    return pmAPI
      .get<MenuViewModel[]>('/api/Menus')
      .then(({ data }) => data)
      .catch(() => undefined);
  }

  getAuthMenu() {
    return pmAPI
      .get<AuthMenuViewModel[]>('/api/Menus/AuthMenus')
      .then(({ data }) => data)
      .catch(() => undefined);
  }
}

export const menuService = new MenuService();
