import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import Tree, { TreeModel } from 'src/components/ui/Tree';
import { Button } from 'src/components/ui/button';
import { AuthMenuViewModel, menuService } from 'src/lib/services/menuService';
import Page from 'src/pages/Page';

const AuthMenuPage = () => {
  const { t } = useTranslation();
  const [treeData, setTreeData] = useState<TreeModel<AuthMenuViewModel>[]>([]);
  const [selected, setSelected] = useState<AuthMenuViewModel>();

  const {
    isLoading,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ['/api/Menus/AuthMenus'],
    queryFn: () => menuService.getAuthMenu(),
  });

  const clickHandle = (item: AuthMenuViewModel) => {
    setSelected(item);
  };

  const parseTreeData = (items: AuthMenuViewModel[]): TreeModel<AuthMenuViewModel>[] => {
    return items.map((item) => {
      return {
        id: item.menuId,
        element: (
          <Button
            variant={item.menuId === selected?.menuId ? 'default' : 'ghost'}
            onClick={() => clickHandle(item)}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {t(`page.${item.menuName}` as any)}
          </Button>
        ),
        data: item,
        expanded: false,
        children: parseTreeData(item.children),
      } as TreeModel<AuthMenuViewModel>;
    });
  };

  useEffect(() => {
    setTreeData(parseTreeData(data));
  }, [data]);

  useUpdateEffect(() => {
    setTreeData(parseTreeData(data));
  }, [selected]);

  return (
    <Page title={t('page.AuthMenu')}>
      <h1>{t('page.AuthMenu')}</h1>
      <div className="flex">
        <Tree data={treeData} isLoading={isLoading} />
        <div>{selected?.menuName}</div>
      </div>
    </Page>
  );
};

export default AuthMenuPage;
