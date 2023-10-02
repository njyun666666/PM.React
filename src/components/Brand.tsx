import { useTranslation } from 'react-i18next';
import { cn } from 'src/lib/utils';

const Brand = () => {
  const { t } = useTranslation();
  return <div className={cn('text-xl font-bold text-primary')}>{t('website.title')}</div>;
};

export default Brand;
