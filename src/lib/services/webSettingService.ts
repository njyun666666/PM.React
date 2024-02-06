import { atom } from 'recoil';

class WebSettingService {
  navOpenState = atom<boolean>({
    key: 'navOpenState',
    default: false,
  });

  navExpandedState = atom<boolean>({
    key: 'navExpandedState',
    default: false,
  });

  navDefaultExpandedState = atom<boolean>({
    key: 'navDefaultExpandedState',
    default:
      localStorage.navDefaultExpanded !== undefined
        ? localStorage.navDefaultExpanded === 'true'
        : true,
  });
}

export const webSettingService = new WebSettingService();
