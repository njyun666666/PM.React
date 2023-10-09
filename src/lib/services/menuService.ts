import pmAPI from '../api/pmAPI';

export interface MenuViewModel {
  menuId: string;
  menuName: string;
  icon?: string;
  url?: string;
  children: MenuViewModel[];
}

class MenuService {
  getMenu() {
    return pmAPI.get<MenuViewModel[]>('/api/Menus').then(({ data }) => data);
  }
}

export const menuService = new MenuService();
