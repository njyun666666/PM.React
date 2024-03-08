import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tree, TreeItem } from 'src/components/ui/Tree';
import { Button } from 'src/components/ui/button';
import { AuthMenuViewModel, menuService } from 'src/lib/services/menuService';
import Page from 'src/pages/Page';

const AuthMenuPage = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<AuthMenuViewModel>();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['/api/Menus/AuthMenus'],
    queryFn: () => menuService.getAuthMenu(),
    staleTime: 30 * 60 * 1000,
  });

  const clickHandle = (item: AuthMenuViewModel) => {
    setSelected(item);
  };

  const renderTree = (items: AuthMenuViewModel[]) => {
    return items.map((item) => {
      return (
        <TreeItem
          key={item.menuId}
          itemID={item.menuId}
          element={
            <Button
              variant={item.menuId === selected?.menuId ? 'default' : 'ghost'}
              onClick={() => clickHandle(item)}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {t(`page.${item.menuName}` as any)}
            </Button>
          }
        >
          {item.children && item.children.length > 0 && renderTree(item.children)}
        </TreeItem>
      );
    });
  };

  return (
    <Page title={t('page.AuthMenu')}>
      <h1>{t('page.AuthMenu')}</h1>
      <div className="flex">
        <Tree isLoading={isLoading}>{data && renderTree(data)}</Tree>
        <div>{selected?.menuName}</div>
      </div>
    </Page>
  );
};

export default AuthMenuPage;
