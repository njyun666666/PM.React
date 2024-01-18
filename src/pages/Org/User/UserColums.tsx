import { ColumnDef } from '@tanstack/react-table';
import DataTableActions from 'src/components/ui/datatable/DataTableActions';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import { useFormStatus } from 'src/lib/common';
import { QueryUsersViewModel, orgUserService } from 'src/lib/services/orgUserService';

export const columns: ColumnDef<QueryUsersViewModel>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.userName']} />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.email']} />,
  },
  {
    accessorKey: 'deptName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.deptName']} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { setFormOpen, setFormData } = useFormStatus(orgUserService.formState);

      return (
        <DataTableActions
          edit={{
            onClick: () => {
              setFormData(row.original);
              setFormOpen(true);
            },
          }}
        />
      );
    },
  },
];
