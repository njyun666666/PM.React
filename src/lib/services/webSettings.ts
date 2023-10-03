import { useEffect, useState } from 'react';
import { atom } from 'recoil';

export enum ScreenEnum {
  default = 0,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
  '2xl' = 1536,
}

export const useScreenMode = () => {
  const getScreenMode = () => {
    if (window.innerWidth >= ScreenEnum['2xl']) {
      return ScreenEnum['2xl'];
    }

    if (window.innerWidth >= ScreenEnum.xl) {
      return ScreenEnum.xl;
    }

    if (window.innerWidth >= ScreenEnum.lg) {
      return ScreenEnum.lg;
    }

    if (window.innerWidth >= ScreenEnum.md) {
      return ScreenEnum.md;
    }

    if (window.innerWidth >= ScreenEnum.sm) {
      return ScreenEnum.sm;
    }

    return ScreenEnum.default;
  };

  const [screenMode, setScreenMode] = useState<ScreenEnum>(getScreenMode());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenMode(getScreenMode());
    });
  }, []);

  return screenMode;
};

export type NavModeType = '';

class WebSettings {
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

export const webSettings = new WebSettings();
