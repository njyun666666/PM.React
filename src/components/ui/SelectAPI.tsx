import React, { useEffect, useMemo, useState } from 'react';
import { OptionModel, OptionQueryProps, optionService } from 'src/lib/services/optionService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { QueryObserverOptions, useQuery } from '@tanstack/react-query';
import { Skeleton } from './skeleton';
import { useUpdateEffect } from 'react-use';

export interface SelectAPIProps extends React.ComponentPropsWithRef<typeof Select> {
  optionQueryProps: OptionQueryProps;
  queryOptions?: QueryObserverOptions<OptionModel[]>;
}

const SelectAPI = ({
  optionQueryProps,
  queryOptions,
  defaultValue = '',
  onValueChange,
  ...props
}: SelectAPIProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  const { isLoading, data } = useQuery({
    queryKey: [optionQueryProps],
    queryFn: () => optionService.query(optionQueryProps),
    staleTime: 30 * 60 * 1000,
    ...queryOptions,
  });

  const filterString = useMemo(() => {
    return JSON.stringify(optionQueryProps);
  }, [optionQueryProps]);

  useEffect(() => {
    if (onValueChange) onValueChange(value as string);
  }, [value]);

  useUpdateEffect(() => {
    setValue('');
  }, [filterString]);

  return (
    <Select value={value} onValueChange={setValue} {...props}>
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
