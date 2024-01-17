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
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { OptionModel, optionService } from 'src/lib/services/optionService';
import { ScrollArea } from './scroll-area';
import { useTranslation } from 'react-i18next';
import { Skeleton } from './skeleton';
import { useDebounce } from 'react-use';

export interface ComboboxProps {
  value: string;
  onSelect?: (item: OptionModel) => void;
  optionsData?: OptionModel[];
  api?: string;
  isInputManual?: boolean;
  className?: string;
  contentClassName?: string;
}

export default function Combobox({
  value,
  onSelect,
  optionsData,
  api,
  isInputManual = false,
  className,
  contentClassName,
}: ComboboxProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionModel[]>();
  const [filter, setFilter] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isDebounced, setIsDebounced] = useState(false);

  const getData = () => {
    if (!api) return;

    return optionService.query(api, filter);
  };

  const queryResult =
    api &&
    useQuery({
      queryKey: [api, isInputManual ? debouncedValue : filter],
      queryFn: getData,
      staleTime: 30 * 60 * 1000,
      enabled: isInputManual ? !!filter : true,
    });

  useDebounce(
    () => {
      console.log(filter);
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
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={className}>
          <span className="flex w-full justify-between">
            <span>{value ? options?.find((option) => option.value === value)?.label : ''}</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', contentClassName)}>
        <Command>
          {isInputManual ? (
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

          {!isInputManual && <CommandEmpty>{t('message.NoFound')}</CommandEmpty>}

          <CommandGroup className={cn()}>
            <ScrollArea className={cn('h-60')}>
              {(queryResult && queryResult.isLoading) || (isInputManual && isDebounced) ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <>
                  {isInputManual && queryResult && queryResult.data?.length === 0 && (
                    <CommandEmpty>{t('message.NoFound')}</CommandEmpty>
                  )}

                  {options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        if (onSelect) onSelect(option);
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
