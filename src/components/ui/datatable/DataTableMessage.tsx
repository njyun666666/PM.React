import { useTranslation } from 'react-i18next';
import { TableCell, TableRow } from '../table';

interface DataTableMessageProps {
  columnsLength: number;
  message?: string;
}

const DataTableMessage = ({ columnsLength, message }: DataTableMessageProps) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell colSpan={columnsLength} className="h-24 text-center">
        {message || t('datatable.NoResults')}
      </TableCell>
    </TableRow>
  );
};

export default DataTableMessage;
