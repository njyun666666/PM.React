import { Building, Home, KanbanSquare, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  state?: boolean;
  children?: NavDataModel[];
}

const iconMapping = {
  Home,
  Building,
  KanbanSquare,
};

const Nav = () => {
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
          URL: '/d2',
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
              URL: '/3-2-1',
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

  return (
    <Accordion type="multiple" className="w-full">
      {menus.map((item) => (
        <NavItem key={item.MenuID} data={item} />
      ))}
    </Accordion>
  );
};

interface NavItemProps {
  data: NavDataModel;
}

const NavItem = ({ data }: NavItemProps) => {
  const [navExpandedState, setNavExpandedState] = useRecoilState(webSettings.navExpandedState);
  const [navOpenState, setNavOpenState] = useRecoilState(webSettings.navOpenState);
  const [navDefaultExpanded] = useRecoilState(webSettings.navDefaultExpandedState);

  if (!data.children || data.children.length === 0) {
    return (
      <AccordionItem value={data.MenuID} className="mb-1.5 border-0">
        <Link
          to={data.URL as string}
          className="flex items-center rounded p-0 pr-1 text-base font-medium hover:bg-accent"
          onClick={() => {
            setNavExpandedState(false);
            setNavOpenState(false);
          }}
        >
          <span className="rounded p-3">
            <data.Icon className="h-4 w-4 shrink-0" />
          </span>
          <span
            className={cn('text-transparent duration-200 group-hover/nav:text-foreground', {
              'text-foreground': navOpenState,
              'xl:text-foreground': navExpandedState || navDefaultExpanded,
            })}
          >
            {data.MenuName}
          </span>
        </Link>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={data.MenuID} className="border-0">
      <AccordionTrigger className="mb-1.5 flex items-center rounded p-0 pr-1 text-base font-medium hover:bg-accent hover:no-underline">
        <div className="flex items-center">
          <span className="rounded p-3">
            <data.Icon className="h-4 w-4 shrink-0 " />
          </span>
          <span
            className={cn('text-transparent duration-200 group-hover/nav:text-foreground', {
              'text-foreground': navOpenState,
              'xl:text-foreground': navExpandedState || navDefaultExpanded,
            })}
          >
            {data.MenuName}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent
        className={cn('text-base', 'pl-0 group-hover/nav:pl-3', {
          'pl-3': navOpenState,
          'xl:pl-3': navExpandedState || navDefaultExpanded,
        })}
      >
        <Accordion type="multiple" className="w-full">
          {data.children.map((item) => (
            <NavItem key={item.MenuID} data={item} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Nav;
