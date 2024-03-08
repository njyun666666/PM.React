import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Skeleton } from './skeleton';

export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

export const Tree = ({ isLoading = false, children }: TreeProps) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-1.5">
        <Skeleton className="h-7 w-[50%] rounded" />
        <Skeleton className="ml-7 h-7 w-[50%] rounded" />
        <Skeleton className="ml-7 h-7 w-[50%] rounded" />
        <Skeleton className="h-7 w-[50%] rounded" />
        <Skeleton className="ml-7 h-7 w-[50%] rounded" />
      </div>
    );
  }

  return <div className="w-full">{children}</div>;
};

export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  itemID: string;
  expanded?: boolean;
  element: React.ReactNode;
}

export const TreeItem = ({ itemID, expanded = false, element, children }: TreeItemProps) => {
  if (!children) {
    return (
      <Accordion type="single" className="w-full ">
        <AccordionItem value={itemID} className="mb-1.5 flex items-center border-0">
          <AccordionTrigger className="invisible mr-1.5 rounded p-3 hover:bg-accent" />
          {element}
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      className="w-full"
      collapsible
      defaultValue={expanded ? itemID : undefined}
    >
      <AccordionItem value={itemID} className="border-0">
        <div className="mb-1.5 flex items-center">
          <AccordionTrigger className="mr-1.5 rounded p-3 hover:bg-accent" />
          {element}
        </div>
        <AccordionContent className={'pl-5 !duration-200'}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
