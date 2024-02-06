import { flexRender, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import {
  ArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayProps,
  FieldArrayPath,
  FieldArray,
  FieldArrayMethodProps,
} from 'react-hook-form';
import { Button } from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { cn } from 'src/lib/utils';
import { useTranslation } from 'react-i18next';
import { FormDetailColumnDef, useFormDetail } from './FormDetailLib';

export interface FormDetailProps<
  TData,
  TValue,
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> {
  title?: React.ReactNode;
  className?: string;
  columns: FormDetailColumnDef<TData, TValue, TFieldValues>[];
  data?: TData[];
  isEdit?: boolean;
  fieldArrayConfig: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>;
  appendConfig?: {
    value:
      | FieldArray<TFieldValues, ArrayPath<TFieldValues>>
      | FieldArray<TFieldValues, ArrayPath<TFieldValues>>[];
    options?: FieldArrayMethodProps;
  };
}

const FormDetail = <TData, TValue, TFieldValues extends FieldValues>({
  columns,
  data,
  isEdit = false,
  fieldArrayConfig,
  title,
  appendConfig,
  className,
}: FormDetailProps<TData, TValue, TFieldValues>) => {
  const { t } = useTranslation();
  const { control: formControl } = fieldArrayConfig;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(fieldArrayConfig);

  const table = useFormDetail({
    data: data ?? (isEdit ? (fields as TData[]) : []),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex w-full items-center">
        <div className="grow text-sm">{title}</div>

        {isEdit && appendConfig && (
          <Button
            type="button"
            size="icon-sm"
            onClick={() => append(appendConfig.value, appendConfig.options)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </div>

      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows?.length
                ? //
                  table.getRowModel().rows.map((row, rowIndex) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => {
                        const column = cell.column.columnDef as FormDetailColumnDef<
                          TData,
                          TValue,
                          TFieldValues
                        >;

                        if (isEdit && column.isEdit) {
                          return (
                            <TableCell key={cell.id}>
                              {column.formCell &&
                                formControl &&
                                column.formCell(formControl, rowIndex, cell.getContext())}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                : //
                  !isEdit && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        {t('datatable.NoResults')}
                      </TableCell>
                    </TableRow>
                  )
              //
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormDetail;
