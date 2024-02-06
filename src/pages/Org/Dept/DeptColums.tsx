import { faEllipsis, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'src/components/ui/button';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { OrgDeptsViewModel } from 'src/lib/services/orgDeptService';

export const columns: ColumnDef<OrgDeptsViewModel>[] = [
  {
    accessorKey: 'deptName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.deptName']} />,
  },
  {
    accessorKey: 'parentDeptName',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={['field.parentDeptName']} />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <FontAwesomeIcon icon={faEllipsis} className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
