import React from 'react';
import { OptionModel, optionService } from 'src/lib/services/optionService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { Skeleton } from './skeleton';

interface SelectAPIProps extends React.ComponentPropsWithRef<typeof Select> {
  api: string;
  queryOptions?: QueryObserverOptions<OptionModel[]>;
}

const SelectAPI = ({ api, queryOptions, ...props }: SelectAPIProps) => {
  const { isLoading, data } = useQuery({
    queryKey: [api],
    queryFn: () => optionService.query(api),
    staleTime: 30 * 60 * 1000,
    ...queryOptions,
  });

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          data?.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectAPI;
