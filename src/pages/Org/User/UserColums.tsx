import { ColumnDef } from '@tanstack/react-table';
import DataTableActions from 'src/components/ui/datatable/DataTableActions';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';
import { useFormStatus } from 'src/lib/common';

export const columns: ColumnDef<CompanyViewModel>[] = [
  {
    accessorKey: 'deptName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'field.company'} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { setFormOpen, setFormData } = useFormStatus(orgDeptService.companyFormState);

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
