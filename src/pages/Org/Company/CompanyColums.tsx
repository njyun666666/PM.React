import { ColumnDef } from '@tanstack/react-table';
import DataTableActions from 'src/components/ui/datatable/DataTableActions';
import { DataTableColumnHeader } from 'src/components/ui/datatable/DataTableColumnHeader';
import { CompanyViewModel, orgDeptService } from 'src/lib/services/orgDeptService';

import { useRecoilState } from 'recoil';

export const columns: ColumnDef<CompanyViewModel>[] = [
  {
    accessorKey: 'deptName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'field.company'} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [, setFormOpenState] = useRecoilState(orgDeptService.CompanyFormOpenState);
      const [, setFormDataState] = useRecoilState(orgDeptService.CompanyFormDataState);

      return (
        <>
          <DataTableActions
            edit={{
              onClick: () => {
                setFormDataState(row.original);
                setFormOpenState(true);
              },
            }}
          />
        </>
      );
    },
  },
];
