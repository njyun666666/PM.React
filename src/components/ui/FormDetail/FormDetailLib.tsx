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

export interface FormDetailTableOptions<TData, TFieldValues extends FieldValues>
  extends TableOptions<TData> {}

export interface FormDetailTable<TData extends RowData, TFieldValues extends FieldValues>
  extends Table<TData> {}

export const useFormDetail = <TData extends RowData, TFieldValues extends FieldValues>(
  options: FormDetailTableOptions<TData, TFieldValues>
): FormDetailTable<TData, TFieldValues> => {
  const table = useReactTable(options) as FormDetailTable<TData, TFieldValues>;

  return table;
};
