import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';

const UserPage = () => {
  console.log('userpage');
  const { t } = useTranslation();
  return <Page title={t('page.OrgCompany')}>UserPage</Page>;
};

export default UserPage;
