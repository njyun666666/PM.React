import { useTranslation } from 'react-i18next';
import { cn } from 'src/lib/utils';

const Brand = () => {
  const { t } = useTranslation();
  return (
    <div className={cn('font-mono text-3xl font-bold text-primary')}>{t('website.title')}</div>
  );
};

export default Brand;
