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
  cancel?: React.ReactNode;
  showCancel?: boolean;
  ok?: React.ReactNode;
  showOk?: boolean;
}

export const alertDialogMainOpenState = atom({
  key: 'alertDialogMainOpenState',
  default: false,
});

export const alertDialogMainState = atom<AlertDialogMainProps>({
  key: 'alertDialogMainState',
  default: {},
});

export const alertDialogMainResolveState = atom<{ resolve?: (value: boolean) => void }>({
  key: 'alertDialogMainResolveState',
  default: {},
});

export const useAlertDialog = () => {
  const setOpen = useSetRecoilState(alertDialogMainOpenState);
  const setProps = useSetRecoilState(alertDialogMainState);
  const setResolve = useSetRecoilState(alertDialogMainResolveState);

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
  const {
    title,
    content,
    cancel,
    showCancel = true,
    ok,
    showOk = true,
  } = useRecoilValue(alertDialogMainState);
  const resolve = useRecoilValue(alertDialogMainResolveState);
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
          {showCancel && (
            <AlertDialogCancel onClick={() => buttonHandle(false)}>
              {cancel ?? t('action.Cancel')}
            </AlertDialogCancel>
          )}

          {showOk && (
            <AlertDialogAction onClick={() => buttonHandle(true)}>
              {ok ?? t('action.OK')}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogMain;
