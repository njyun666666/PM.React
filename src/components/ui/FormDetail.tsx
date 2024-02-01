import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import {
  Control,
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  UseFieldArrayReturn,
  useFieldArray,
  UseFieldArrayProps,
  FieldArrayPath,
} from 'react-hook-form';
import { Button } from './button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export type FormDetailColumnDef<
  TData extends RowData,
  TValue = unknown,
  // TControl extends FieldValues = FieldValues,
  TFieldValues extends FieldValues = FieldValues,
> = ColumnDef<TData, TValue> & {
  formCell?: (
    formControl: Control<TFieldValues>,
    index: number
    // field: FieldArrayWithId<TFieldValues>
  ) => React.ReactNode;
};

export interface FormDetailProps<
  TData,
  TValue,
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> {
  columns: FormDetailColumnDef<TData, TValue, TFieldValues>[];
  data?: TData[];
  fieldArrayConfig: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>;
}
// formControl: Control<TFieldValues>;
// fieldArrayName: ArrayPath<TFieldValues>;

//   fieldArray: UseFieldArrayReturn<TFieldValues>;

const FormDetail = <TData, TValue, TFieldValues extends FieldValues>({
  columns,
  data,
  fieldArrayConfig, // formControl,
} // fieldArrayName, //   fieldArray,
: FormDetailProps<TData, TValue, TFieldValues>) => {
  const { control: formControl } = fieldArrayConfig;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(fieldArrayConfig);

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // debugAll: true,
  });

  return (
    <div>
      <div>
        <Button type="button" size="icon" onClick={() => append([])}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <div className="rounded-md border">
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
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                {
                  columns.map((col) => {
                    return (
                      <TableCell key={col.id}>
                        {col.formCell && formControl && col.formCell(formControl, index)}
                      </TableCell>
                    );
                  })

                  // field
                }
              </TableRow>
            ))}

            {/* {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormDetail;
