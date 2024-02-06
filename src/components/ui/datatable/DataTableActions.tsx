import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { faEllipsis, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export interface DataTableActionsProps {
  edit?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
}

const DataTableActions = ({ edit }: DataTableActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <FontAwesomeIcon icon={faEllipsis} className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {edit && (
            <DropdownMenuItem {...edit}>
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2 h-4 w-4" />
              <span>{t('action.Edit')}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableActions;
