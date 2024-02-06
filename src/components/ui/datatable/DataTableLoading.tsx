import { Skeleton } from '../skeleton';
import { TableCell, TableRow } from '../table';

interface DataTableLoadingProps {
  columnsLength: number;
  rowsLength: number;
}

const DataTableLoading = ({ columnsLength, rowsLength }: DataTableLoadingProps) => {
  return (
    <>
      {Array.from(Array(rowsLength).keys()).map((i) => (
        <TableRow key={i}>
          {Array.from(Array(columnsLength).keys()).map((j) => (
            <TableCell key={j}>
              <Skeleton className="h-8 w-1/2" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default DataTableLoading;
