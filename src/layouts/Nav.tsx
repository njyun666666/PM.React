import { Building, Home, KanbanSquare, LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { webSettings } from 'src/lib/services/webSettings';
import { cn } from 'src/lib/utils';

interface NavDataModel {
  MenuID: string;
  MenuName: string;
  Icon: LucideIcon;
  URL?: string;
  children?: NavDataModel[];
}

const iconMapping = {
  Home,
  Building,
  KanbanSquare,
};

const findChildren = (data: NavDataModel[], targetValue: string): NavDataModel[] => {
  let result: NavDataModel[] = [];
  const length = data.length;

  for (let i = 0; i < length; i++) {
    if (data[i].URL === targetValue) {
      result = [data[i]];
      break;
    } else if (data[i].children) {
      const resultChildren = findChildren(data[i].children as NavDataModel[], targetValue);
      if (resultChildren.length > 0) {
        result = [data[i], ...resultChildren];
        break;
      }
    }
  }

  return result;
};

const Nav = () => {
  const location = useLocation();

  const menus: NavDataModel[] = [
    {
      MenuID: '1',
      MenuName: 'Home',
      Icon: Home,
      URL: '/',
    },
    {
      MenuID: '2',
      MenuName: '2-0',
      Icon: Building,
      children: [
        {
          MenuID: '2-1',
          MenuName: '2-1',
          Icon: Building,
          URL: '/d2',
        },
        {
          MenuID: '2-2',
          MenuName: '2-2',
          Icon: Building,
          URL: '/d2-2',
        },
      ],
    },
    {
      MenuID: '3',
      MenuName: '3-0',
      Icon: KanbanSquare,
      children: [
        {
          MenuID: '3-1',
          MenuName: '3-1',
          Icon: KanbanSquare,
          URL: '/3-1',
        },
        {
          MenuID: '3-2',
          MenuName: '3-2',
          Icon: KanbanSquare,
          URL: '/3-2',
          children: [
            {
              MenuID: '3-2-1',
              MenuName: '3-2-1',
              Icon: KanbanSquare,
              URL: '/d3-2-1',
            },
            {
              MenuID: '3-2-2',
              MenuName: '3-2-2',
              Icon: KanbanSquare,
              URL: '/3-2-2',
            },
          ],
        },
      ],
    },
  ];

  const expandedValue = useMemo(
    () => findChildren(menus, location.pathname).map((item) => item.MenuID),
    []
  );

  return (
    <Accordion type="multiple" className="w-full" defaultValue={expandedValue}>
      {menus.map((item) => (
        <NavItem key={item.MenuID} data={item} expandedValue={expandedValue} />
      ))}
    </Accordion>
  );
};

interface NavItemProps {
  data: NavDataModel;
  expandedValue: string[];
}

const NavItem = ({ data, expandedValue }: NavItemProps) => {
  const [navExpandedState, setNavExpandedState] = useRecoilState(webSettings.navExpandedState);
  const [navOpenState, setNavOpenState] = useRecoilState(webSettings.navOpenState);
  const [navDefaultExpanded] = useRecoilState(webSettings.navDefaultExpandedState);

  if (!data.children || data.children.length === 0) {
    return (
      <AccordionItem value={data.MenuID} className="mb-1.5 border-0">
        <NavLink
          to={data.URL as string}
          className={({ isActive }) =>
            cn('flex items-center rounded p-0 pr-1 text-base font-normal hover:bg-accent', {
              'navIsActive group': isActive,
              '!bg-accent': isActive && (navOpenState || navExpandedState),
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
              'rounded p-3 group-[.navIsActive]:bg-accent group-[.navIsActive]:text-primary'
            )}
          >
            <data.Icon className="h-4 w-4 shrink-0" />
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
            {data.MenuName}
          </span>
        </NavLink>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={data.MenuID} className="border-0">
      <AccordionTrigger className="mb-1.5 flex items-center rounded p-0 pr-1 text-base font-normal hover:bg-accent hover:no-underline">
        <div className="flex items-center">
          <span className="rounded p-3">
            <data.Icon className="h-4 w-4 shrink-0" />
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
            {data.MenuName}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent
        className={cn('pl-0 text-base group-hover/nav:pl-3', {
          'pl-3': navOpenState || navExpandedState,
          'xl:pl-3': navDefaultExpanded,
        })}
      >
        <Accordion type="multiple" className="w-full" defaultValue={expandedValue}>
          {data.children.map((item) => (
            <NavItem key={item.MenuID} data={item} expandedValue={expandedValue} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Nav;
