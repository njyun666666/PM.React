import { createRow, flexRender, getCoreRowModel } from '@tanstack/react-table';
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
import { FormDetailColumnDef, useFormDetail } from './FormDetailLib';
import DataTableActions from '../datatable/DataTableActions';

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
  const { control: formControl } = fieldArrayConfig;
  const { fields, append, remove, move, insert } = useFieldArray(fieldArrayConfig);

  const table = useFormDetail({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex w-full items-center">
        <div className="grow text-sm">{title}</div>

        {isEdit && (
          <Button
            type="button"
            size="icon-sm"
            onClick={() => append(appendConfig!.value, appendConfig!.options)}
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

                {isEdit && <TableHead className="w-4"></TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {fields.map((item, rowIndex) => {
              const row = createRow(table, item.id, item as TData, rowIndex, 0);

              return (
                <TableRow key={item.id}>
                  {row.getVisibleCells().map((cell) => {
                    const columnDef = cell.column.columnDef as FormDetailColumnDef<
                      TData,
                      TValue,
                      TFieldValues
                    >;
                    if (isEdit && columnDef.isEdit) {
                      return (
                        <TableCell key={cell.id}>
                          {columnDef.formCell &&
                            formControl &&
                            columnDef.formCell(formControl, rowIndex, cell.getContext())}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={cell.id}>
                        {flexRender(columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}

                  {isEdit && (
                    <TableCell>
                      <DataTableActions
                        insertPrev={{
                          onClick: () => {
                            insert(rowIndex, appendConfig!.value);
                          },
                        }}
                        insertNext={{
                          onClick: () => {
                            insert(rowIndex + 1, appendConfig!.value);
                          },
                        }}
                        MoveUp={{
                          onClick: () => {
                            if (rowIndex > 0) move(rowIndex, rowIndex - 1);
                          },
                        }}
                        MoveDown={{
                          onClick: () => {
                            if (rowIndex + 1 < fields.length) move(rowIndex, rowIndex + 1);
                          },
                        }}
                        remove={{
                          onClick: () => {
                            remove(rowIndex);
                          },
                        }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormDetail;
