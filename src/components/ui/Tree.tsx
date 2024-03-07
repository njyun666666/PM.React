import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { cn } from 'src/lib/utils';
import { Skeleton } from './skeleton';

export interface TreeModel<T> {
  id: string;
  element: React.ReactNode;
  data: T;
  selected?: boolean;
  expanded?: boolean;
  children?: TreeModel<T>[];
}

export interface TreeProps<T> {
  data: TreeModel<T>[];
  isLoading?: boolean;
}

const Tree = <T,>({ data, isLoading = false }: TreeProps<T>) => {
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

  if (data.length === 0) {
    return <></>;
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={data.filter((x) => x.expanded).map((x) => x.id)}
    >
      {data.map((item) => (
        <TreeItem key={item.id} data={item} />
      ))}
    </Accordion>
  );
};

interface TreeItemProps<T> {
  data: TreeModel<T>;
}

const TreeItem = <T,>({ data }: TreeItemProps<T>) => {
  if (!data.children || data.children.length === 0) {
    return (
      <AccordionItem value={data.id} className="mb-1.5 flex items-center border-0">
        <AccordionTrigger className="invisible mr-1.5 rounded p-3 hover:bg-accent" />
        {data.element}
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={data.id} className="border-0">
      <div className="mb-1.5 flex items-center">
        <AccordionTrigger className="mr-1.5 rounded p-3 hover:bg-accent" />
        {data.element}
      </div>

      <AccordionContent className={cn('pl-5 !duration-200')}>
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={data.children.filter((x) => x.expanded).map((x) => x.id)}
        >
          {data.children.map((item) => (
            <TreeItem key={item.id} data={item} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Tree;
