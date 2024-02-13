import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import {
  faArrowDown,
  faArrowUp,
  faEllipsis,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export interface DataTableActionsProps {
  edit?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
  insertPrev?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
  insertNext?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
  MoveUp?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
  MoveDown?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
  remove?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem>;
}

const DataTableActions = ({
  edit,
  insertPrev,
  insertNext,
  MoveUp,
  MoveDown,
  remove,
}: DataTableActionsProps) => {
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

          {insertPrev && (
            <DropdownMenuItem {...insertPrev}>
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              <span>{t('action.InsertPrev')}</span>
            </DropdownMenuItem>
          )}
          {insertNext && (
            <DropdownMenuItem {...insertNext}>
              <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
              <span>{t('action.InsertNext')}</span>
            </DropdownMenuItem>
          )}

          {MoveUp && (
            <DropdownMenuItem {...MoveUp}>
              <FontAwesomeIcon icon={faArrowUp} className="mr-2 h-4 w-4" />
              <span>{t('action.MoveUp')}</span>
            </DropdownMenuItem>
          )}

          {MoveDown && (
            <DropdownMenuItem {...MoveDown}>
              <FontAwesomeIcon icon={faArrowDown} className="mr-2 h-4 w-4" />
              <span>{t('action.MoveDown')}</span>
            </DropdownMenuItem>
          )}

          {remove && (
            <DropdownMenuItem {...remove}>
              <FontAwesomeIcon icon={faTrashCan} className="mr-2 h-4 w-4" />
              <span>{t('action.Remove')}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableActions;
