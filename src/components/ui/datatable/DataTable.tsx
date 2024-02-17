import { useEffect, useState } from 'react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
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
import { QueryFunction, QueryObserverOptions, useQuery } from '@tanstack/react-query';
import DataTableLoading from 'src/components/ui/datatable/DataTableLoading';
import DataTableMessage from 'src/components/ui/datatable/DataTableMessage';
import { QueryViewModel, queryService } from 'src/lib/services/queryService';

interface DataTableProps<TData, TValue, TFilter> {
  columns: ColumnDef<TData, TValue>[];
  reloadData?: Date;
  api: string;
  filter: TFilter;
  queryEnabled?: boolean;
  queryOptions?: QueryObserverOptions<QueryViewModel<TData[]>>;
}

export default function DataTable<TData, TValue, TFilter>({
  columns,
  reloadData,
  api,
  filter,
  queryEnabled = true,
  queryOptions,
}: DataTableProps<TData, TValue, TFilter>) {
  const [enabled, setEnabled] = useState(queryEnabled);
  const [sorting, setSorting] = useState<SortingState>();
  const [filterData, setFilterData] = useState<TFilter>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getData: QueryFunction<QueryViewModel<TData[]>> = () => {
    return queryService.query(api, {
      filter: filter,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sort: sorting ? sorting[0].id : undefined,
      desc: sorting ? sorting[0].desc : undefined,
    });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: [api, filterData, pagination, sorting, reloadData],
    queryFn: getData,
    enabled: enabled,
    ...queryOptions,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.pageCount ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: (values) => {
      table.resetPageIndex();
      setSorting(values as SortingState);
    },
  });

  useEffect(() => {
    table.resetPageIndex();
    setFilterData(filter);
  }, [filter]);

  useEffect(() => {
    setEnabled(queryEnabled);
  }, [queryEnabled]);

  return (
    <div>
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
            {isLoading ? (
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
              <DataTableMessage columnsLength={columns.length} message={error?.message} />
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
