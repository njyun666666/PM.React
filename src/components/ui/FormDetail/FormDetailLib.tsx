import {
  CellContext,
  ColumnDef,
  RowData,
  Table,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { Control, FieldValues } from 'react-hook-form';

/**
 * @example
 * type FormSchema = z.infer<typeof formSchema>;
 * type DetailSchema = z.infer<typeof detailSchema>;
 * const columns: FormDetailColumnDef<DetailSchema, unknown, FormSchema>[] = []
 */
export type FormDetailColumnDef<
  TData extends RowData,
  TValue = unknown,
  TFieldValues extends FieldValues = FieldValues,
> = ColumnDef<TData, TValue> & {
  isEdit?: boolean;
  formCell?: (
    formControl: Control<TFieldValues>,
    rowIndex: number,
    cell: CellContext<TData, TValue>
  ) => React.ReactNode;
};

export interface FormDetailTableOptions<TData> extends TableOptions<TData> {}

export interface FormDetailTable<TData extends RowData> extends Table<TData> {}

export const useFormDetail = <TData extends RowData>(
  options: FormDetailTableOptions<TData>
): FormDetailTable<TData> => {
  const table = useReactTable(options) as FormDetailTable<TData>;

  return table;
};
