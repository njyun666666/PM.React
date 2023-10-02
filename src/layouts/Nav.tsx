import { Building, Home, KanbanSquare, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';

interface NavDataModel {
  MenuID: string;
  MenuName: string;
  Icon: LucideIcon;
  URL?: string;
  children?: NavDataModel[];
}

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
          URL: '/2-1',
        },
        {
          MenuID: '2-2',
          MenuName: '2-2',
          Icon: Building,
          URL: '/2-2',
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
  if (!data.children || data.children.length === 0) {
    return (
      <AccordionItem value={data.MenuID} className="border-0">
        <Link
          to={data.URL as string}
          className="flex items-center rounded px-2 py-1.5 text-base font-medium hover:bg-accent"
        >
          <data.Icon className="mr-2 h-4 w-4 shrink-0" />
          <span>{data.MenuName}</span>
        </Link>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={data.MenuID} className="border-0">
      <AccordionTrigger className="flex items-center rounded px-2 py-1.5 text-base font-medium hover:bg-accent hover:no-underline">
        <div className="flex items-center">
          <data.Icon className="mr-2 h-4 w-4 shrink-0" />
          <span>{data.MenuName}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-3 text-base">
        <Accordion type="multiple" className="w-full  pb-0">
          {data.children.map((item) => (
            <NavItem key={item.MenuID} data={item} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Nav;
