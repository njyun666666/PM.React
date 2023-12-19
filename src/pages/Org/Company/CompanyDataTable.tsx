import * as React from 'react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { DataTablePagination } from 'src/components/ui/datatable/DataTablePagination';
import { useTranslation } from 'react-i18next';
import { Input } from 'src/components/ui/input';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form';
import { Button } from 'src/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CompanyModel, orgDeptService } from 'src/lib/services/orgDeptService';
import { useQuery } from '@tanstack/react-query';
import DataTableLoading from 'src/components/ui/datatable/DataTableLoading';
import DataTableMessage from 'src/components/ui/datatable/DataTableMessage';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  reloadData?: number;
}

export function DataTable<TData, TValue>({
  columns,
  reloadData = 0,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [filter, setFilter] = React.useState<CompanyModel>();
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'deptName', desc: false }]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getData = () => {
    return orgDeptService.queryCompany({
      filter: filter || { deptName: '' },
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sort: sorting[0].id,
      desc: sorting[0].desc,
    });
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['queryCompany', filter, pagination, sorting, reloadData],
    queryFn: getData,
  });

  const table = useReactTable({
    data: (data?.data ?? []) as TData[],
    columns,
    pageCount: data?.pageCount ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: (values) => {
      table.resetPageIndex();
      setSorting(values);
    },
  });

  const formSchema = z.object({
    deptName: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deptName: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    table.resetPageIndex();
    setFilter(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-4 grid w-full grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="deptName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('field.companyName')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <Button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </div>
        </form>
      </Form>

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
            {isFetching || isPending ? (
              <DataTableLoading
                columnsLength={columns.length}
                rowsLength={table.getRowModel().rows?.length || pagination.pageSize}
              />
            ) : table.getRowModel().rows?.length ? (
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
              <DataTableMessage columnsLength={columns.length} message={error?.name} />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
