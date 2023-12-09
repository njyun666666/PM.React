import { RoleType } from 'src/appConst';
import { loginService } from 'src/lib/services/loginService';
import { Alert, AlertTitle } from './ui/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { cn } from 'src/lib/utils';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';

interface RolesRouterProps {
  roles: RoleType[];
  element?: React.ReactNode;
}

const RolesRouter = ({ roles, element }: RolesRouterProps) => {
  const { t } = useTranslation();

  if (loginService.checkRole(roles)) {
    if (element) {
      return <>{element}</>;
    } else {
      return <Outlet />;
    }
  }

  return (
    <div className={cn('p-4')}>
      <Alert variant="destructive">
        <FontAwesomeIcon icon={faCircleExclamation} className="h-4 w-4" />
        <AlertTitle>{t('messages.Forbidden')}</AlertTitle>
      </Alert>
    </div>
  );
};

export default RolesRouter;
