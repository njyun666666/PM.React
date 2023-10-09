import { faCircle, faHome, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { MenuViewModel, menuService } from 'src/lib/services/menuService';
import { webSettingService } from 'src/lib/services/webSettingService';
import { cn } from 'src/lib/utils';

const iconMapping = {
  faCircle,
  faHome,
  faSitemap,
};

const findChildren = (data: MenuViewModel[], targetValue: string): MenuViewModel[] => {
  const length = data.length;

  for (let i = 0; i < length; i++) {
    if (data[i].url?.toLowerCase() === targetValue.toLowerCase()) {
      // console.log(data[i].menuId, data[i].url, targetValue);
      return [data[i]];
    } else if (data[i].children) {
      const resultChildren = findChildren(data[i].children as MenuViewModel[], targetValue);
      if (resultChildren.length > 0) {
        return [data[i], ...resultChildren];
      }
    }
  }

  return [];
};

const Nav = () => {
  const location = useLocation();
  const [menus, setMenus] = useState<MenuViewModel[]>([]);
  const [expandedValue, setExpandedValue] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const m = await menuService.getMenu();
      setExpandedValue(findChildren(m, location.pathname).map((item) => item.menuId));
      setMenus(m);
    }

    fetchData();
  }, []);

  if (menus.length === 0) {
    return null;
  }

  return (
    <Accordion type="multiple" className="w-full" defaultValue={expandedValue}>
      {menus.map((item) => (
        <NavItem key={item.menuId} data={item} expandedValue={expandedValue} />
      ))}
    </Accordion>
  );
};

interface NavItemProps {
  data: MenuViewModel;
  expandedValue: string[];
}

const NavItem = ({ data, expandedValue }: NavItemProps) => {
  const [navExpandedState, setNavExpandedState] = useRecoilState(
    webSettingService.navExpandedState
  );
  const [navOpenState, setNavOpenState] = useRecoilState(webSettingService.navOpenState);
  const [navDefaultExpanded] = useRecoilState(webSettingService.navDefaultExpandedState);

  if (!data.children || data.children.length === 0) {
    return (
      <AccordionItem value={data.menuId} className="mb-1.5 border-0">
        <NavLink
          to={data.url as string}
          className={({ isActive }) =>
            cn('flex items-center rounded p-0 pr-1 text-base font-normal hover:bg-accent', {
              'navIsActive group': isActive,
              'bg-accent': isActive && (navOpenState || navExpandedState),
              'xl:bg-accent': isActive && navDefaultExpanded,
            })
          }
          onClick={() => {
            setNavExpandedState(false);
            setNavOpenState(false);
          }}
        >
          <span
            className={cn(
              'rounded p-3 leading-none group-[.navIsActive]:bg-accent group-[.navIsActive]:text-primary'
            )}
          >
            <NavIcon icon={data.icon} />
          </span>
          <span
            className={cn(
              'text-foreground opacity-0 duration-200 group-[.navIsActive]:font-bold group-[.navIsActive]:text-primary',
              {
                'opacity-100': navOpenState || navExpandedState,
                'xl:opacity-100': navDefaultExpanded,
              }
            )}
          >
            {data.menuName}
          </span>
        </NavLink>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={data.menuId} className="border-0">
      <AccordionTrigger className="mb-1.5 flex items-center rounded p-0 pr-1 text-base font-normal hover:bg-accent hover:no-underline">
        <div className="flex items-center">
          <span className="rounded p-3 leading-none">
            <NavIcon icon={data.icon} />
          </span>
          <span
            className={cn(
              'text-foreground opacity-0 duration-200 group-[.navIsActive]:text-primary',
              {
                'opacity-100': navOpenState || navExpandedState,
                'xl:opacity-100': navDefaultExpanded,
              }
            )}
          >
            {data.menuName}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          'pl-0 text-base transition-[padding-left] duration-200 group-hover/nav:pl-3',
          {
            'pl-3': navOpenState || navExpandedState,
            'xl:pl-3': navDefaultExpanded,
          }
        )}
      >
        <Accordion type="multiple" className="w-full" defaultValue={expandedValue}>
          {data.children.map((item) => (
            <NavItem key={item.menuId} data={item} expandedValue={expandedValue} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

const NavIcon = ({ icon }: { icon?: string }) => {
  const Icon = iconMapping[icon as keyof typeof iconMapping] || iconMapping.faCircle;
  return <FontAwesomeIcon icon={Icon} className="h-4 w-4 shrink-0" />;
};

export default Nav;
