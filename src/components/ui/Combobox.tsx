import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandInputManual,
  CommandItem,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { OptionModel, OptionQueryProps, optionService } from 'src/lib/services/optionService';
import { ScrollArea } from './scroll-area';
import { useTranslation } from 'react-i18next';
import { Skeleton } from './skeleton';
import { useDebounce, useUpdateEffect } from 'react-use';

export interface ComboboxProps {
  onValueChange?: (val: string) => void;
  optionsData?: OptionModel[];
  optionQueryProps?: OptionQueryProps;
  className?: string;
  contentClassName?: string;
}

export default function Combobox({
  onValueChange,
  optionsData,
  optionQueryProps,
  className,
  contentClassName,
}: ComboboxProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<OptionModel>({ label: '', value: '' });
  const [options, setOptions] = useState<OptionModel[]>();
  const [filter, setFilter] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isDebounced, setIsDebounced] = useState(false);

  const filterString = useMemo(() => {
    return JSON.stringify(optionQueryProps);
  }, [optionQueryProps]);

  const getData = () => {
    if (!optionQueryProps) return;

    return optionService.query({
      ...optionQueryProps,
      filter: { ...optionQueryProps.filter, input: debouncedValue },
    });
  };

  const queryResult =
    optionQueryProps &&
    useQuery({
      queryKey: [optionQueryProps, debouncedValue],
      queryFn: getData,
      staleTime: 30 * 60 * 1000,
      enabled: !!debouncedValue,
    });

  useDebounce(
    () => {
      setIsDebounced(false);
      setDebouncedValue(filter);
    },
    1000,
    [filter]
  );

  useEffect(() => {
    if (queryResult) {
      setOptions(queryResult.data);
    } else {
      setOptions(optionsData);
    }
  }, [queryResult, optionsData]);

  useEffect(() => {
    setOpen(false);
    if (onValueChange) onValueChange(value.value);
  }, [value]);

  useUpdateEffect(() => {
    setValue({ label: '', value: '' });
  }, [filterString]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={className}>
          <span className="flex w-full justify-between">
            <span>{value?.label}</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', contentClassName)}>
        <Command>
          {optionQueryProps ? (
            <CommandInputManual
              value={filter}
              onChange={(e) => {
                setIsDebounced(true);
                setFilter(e.currentTarget.value);
              }}
            />
          ) : (
            <CommandInput />
          )}

          {!optionQueryProps && <CommandEmpty>{t('message.NoFound')}</CommandEmpty>}

          <CommandGroup className={cn()}>
            <ScrollArea className={cn('h-60')}>
              {optionQueryProps && ((queryResult && queryResult.isLoading) || isDebounced) ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <>
                  {optionQueryProps && queryResult && queryResult.data?.length === 0 && (
                    <CommandEmpty>{t('message.NoFound')}</CommandEmpty>
                  )}

                  {options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        setValue(option);
                      }}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </>
              )}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
