import { useEffect, useState } from 'react';
import { RecoilState, atom, useRecoilState } from 'recoil';
import { uuid } from './utils';

export interface QueryModel<T> {
  filter: T;
  pageIndex: number;
  pageSize: number;
  sort?: string;
  desc?: boolean;
}

export interface QueryViewModel<T> {
  data: T;
  pageCount: number;
}

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

export interface FormState<T> {
  open: RecoilState<boolean>;
  data: RecoilState<T>;
}

export const formState = <T>() => {
  const key = uuid();
  return {
    open: atom<boolean>({
      key: key + 'OpenState',
      default: false,
    }),
    data: atom<T>({
      key: key + 'DataState',
      default: undefined,
    }),
  } as FormState<T>;
};

export const useFormStatus = <T>({ open, data }: FormState<T>) => {
  const [formOpen, setFormOpen] = useRecoilState(open);
  const [formData, setFormData] = useRecoilState(data);

  return { formOpen, setFormOpen, formData, setFormData };
};
