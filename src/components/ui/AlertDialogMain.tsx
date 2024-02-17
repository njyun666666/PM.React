import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { useTranslation } from 'react-i18next';

export interface AlertDialogMainProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  Cancel?: React.ReactNode;
  ok?: React.ReactNode;
}

export const alertDialogMainOpenState = atom({
  key: 'alertDialogMainOpenState',
  default: false,
});

export const alertDialogMainState = atom<AlertDialogMainProps>({
  key: 'alertDialogMainState',
  default: {},
});

export const alertDialogResolveState = atom<{ resolve?: (value: boolean) => void }>({
  key: 'alertDialogResolveState',
  default: {},
});

export const useAlertDialog = () => {
  const setOpen = useSetRecoilState(alertDialogMainOpenState);
  const setProps = useSetRecoilState(alertDialogMainState);
  const setResolve = useSetRecoilState(alertDialogResolveState);

  const alertDialog = (props: AlertDialogMainProps) =>
    new Promise<boolean>((resolve) => {
      setOpen(true);
      setProps(props);
      setResolve({ resolve: resolve });
    });

  return { alertDialog };
};

const AlertDialogMain = () => {
  const [open, setOpen] = useRecoilState(alertDialogMainOpenState);
  const { title, content, Cancel, ok } = useRecoilValue(alertDialogMainState);
  const resolve = useRecoilValue(alertDialogResolveState);
  const { t } = useTranslation();

  const buttonHandle = (result: boolean) => {
    if (resolve.resolve) {
      resolve.resolve(result);
    }

    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => buttonHandle(false)}>
            {Cancel ?? t('action.Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => buttonHandle(true)}>
            {ok ?? t('action.OK')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogMain;
