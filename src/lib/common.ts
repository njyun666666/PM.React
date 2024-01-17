import { RecoilState, atom, useRecoilState } from 'recoil';
import { uuid } from './utils';
import { createBreakpoint } from 'react-use';

export type BreakpointType = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'default';

export const useBreakpoint = createBreakpoint({
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  default: 0,
}) as () => BreakpointType;

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
