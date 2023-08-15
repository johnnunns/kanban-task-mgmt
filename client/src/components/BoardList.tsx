import { ListItem, Link, ListItemButton, Typography } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Modals } from '../types';

const BoardList: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { boardNames, selectedBoard } = useSelector((state) => state.boards);
  const { openModal, closeModal } = useActions();

  return (
    <>
      <ListItem>
        <Typography variant="h4" color="text.secondary">
          ALL BOARDS ({boardNames.length})
        </Typography>
      </ListItem>
      {boardNames?.map((board) => {
        const selected = selectedBoard?.id === board.id;
        return (
          <ListItem key={board.id} disablePadding>
            <Link
              component={ReactRouterLink}
              underline="none"
              onClick={() => {
                if (isMobile) {
                  setTimeout(() => closeModal(), 100);
                }
              }}
              to={`/${board.id}`}
              sx={{
                width: '100%',
              }}
              color="text.secondary"
            >
              <ListItemButton
                disableRipple
                sx={{
                  minHeight: 48,
                  backgroundColor: selected ? 'primary.main' : 'inherit',
                  borderTopRightRadius: '17px',
                  borderBottomRightRadius: '17px',
                  width: '90%',
                  '&:hover': {
                    backgroundColor: selected ? 'primary.main' : 'inherit',
                  },
                }}
              >
                <FontAwesomeIcon icon={faTableList} size="xl" />
                <Typography
                  variant="h3"
                  sx={{
                    ml: 2,
                    color: selected ? '#fff' : 'inherit',
                  }}
                >
                  {board.name}
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => openModal(Modals.ADD_BOARD)}
          sx={{
            minHeight: 48,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'inherit',
            },
          }}
        >
          <FontAwesomeIcon icon={faTableList} size="xl" />
          <Typography variant="h3" sx={{ ml: 2 }}>
            + Create new table
          </Typography>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default BoardList;
