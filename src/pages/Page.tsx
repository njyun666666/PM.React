import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Page = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {title} | {t('website.title')}
        </title>
      </Helmet>
      {children}
    </>
  );
};

export default Page;
