import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { cn } from 'src/lib/utils';

interface PageProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Page = ({ title, children, className }: PageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {title} | {t('website.title')}
        </title>
      </Helmet>
      <div className={cn(className)}>{children}</div>
    </>
  );
};

export default Page;
