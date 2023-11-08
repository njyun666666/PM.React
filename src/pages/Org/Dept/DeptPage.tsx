import { useTranslation } from 'react-i18next';
import Page from 'src/pages/Page';

const DeptPage = () => {
  const { t } = useTranslation();

  return <Page title={t('page.OrgDept')}>dept</Page>;
};

export default DeptPage;
