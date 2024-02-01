import { ColumnDef } from '@tanstack/react-table';
import DataTableActions from 'src/components/ui/datatable/DataTableActions';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import { useFormStatus } from 'src/lib/common';
import { OrgUserViewModel, orgUserService } from 'src/lib/services/orgUserService';

export const columns: ColumnDef<OrgUserViewModel>[] = [
  {
    accessorKey: 'name',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.company']} />,
  },
  {
    accessorKey: 'email',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title={['field.enable']} />,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const { setFormOpen, setFormData } = useFormStatus(orgUserService.formState);

  //     return (
  //       <DataTableActions
  //         edit={{
  //           onClick: () => {
  //             setFormData(row.original);
  //             setFormOpen(true);
  //           },
  //         }}
  //       />
  //     );
  //   },
  // },
];
