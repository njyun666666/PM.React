import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';

const AuthRolePage = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.AuthRole')}>
      <h1>{t('page.AuthRole')}</h1>
    </Page>
  );
};

export default AuthRolePage;
