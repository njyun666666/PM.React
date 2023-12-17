import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
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
import { CompanyModel, CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import { QueryModel } from 'src/lib/common';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

export function DataTable<TData, TValue>({ columns }: DataTableProps<TData, TValue>) {
  const { t } = useTranslation();
  const [data, setData] = React.useState<CompanyViewModel[]>([]);
  const [filter, setFilter] = React.useState<CompanyModel>();
  const [pageCount, setPageCount] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'deptName', desc: false }]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });
  // const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  const table = useReactTable({
    data: data as TData[],
    columns,
    pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    manualSorting: true,
    // debugTable: true,
  });

  const getData = () => {
    if (filter) {
      orgDeptService
        .queryCompany({
          filter: filter,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sort: sorting[0].id,
          desc: sorting[0].desc,
        })
        .then((data) => {
          setData(data?.data || []);
          setPageCount(data?.pageCount || 1);
          // console.log(data);
        });
    }
  };

  React.useEffect(() => {
    table.resetPageIndex();
    getData();
  }, [filter, sorting]);

  React.useEffect(() => {
    getData();
  }, [pagination]);

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
            {table.getRowModel().rows?.length ? (
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
                  {t('datatable.NoResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
