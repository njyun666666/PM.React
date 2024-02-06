import { RoleType } from 'src/appConst';
import { loginService } from 'src/lib/services/loginService';
import { Alert, AlertTitle } from '../components/ui/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>{t('website.title')}</title>
      </Helmet>
      <Alert variant="destructive">
        <FontAwesomeIcon icon={faCircleExclamation} className="h-4 w-4" />
        <AlertTitle>{t('message.Forbidden')}</AlertTitle>
      </Alert>
    </>
  );
};

export default RolesRouter;
