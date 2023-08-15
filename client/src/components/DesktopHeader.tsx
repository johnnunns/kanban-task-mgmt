import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  useTheme,
  Popover,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelector';
import { Modals } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const DesktopHeader: React.FC<{
  name: string | undefined;
  logo: ReactNode;
}> = ({ name, logo }) => {
  const theme = useTheme();
  const { openModal } = useActions();
  const { selectedBoard } = useSelector((state) => state.boards);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      height="100%"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <Box
          pr={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid',
            borderColor: theme.palette.border?.main,
            height: '100%',
          }}
        >
          {logo}
        </Box>
        <Box pl={5} height="100%" display="flex" alignItems="center">
          <Typography variant="h2">{name}</Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(Modals.ADD_TASK)}
          disabled={!selectedBoard?.columns?.length}
        >
          + Add New Task
        </Button>
        <Box ml={1}>
          <IconButton onClick={handleOpenPopover}>
            <FontAwesomeIcon
              icon={faEllipsis}
              style={{ transform: 'rotate(90deg)' }}
            />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClosePopover();
                    openModal(Modals.EDIT_BOARD);
                  }}
                  sx={{ minWidth: '192px' }}
                >
                  Edit Board
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClosePopover();
                    openModal(Modals.DELETE_BOARD);
                  }}
                  sx={{ minWidth: '192px', color: 'error.main' }}
                >
                  Delete Board
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

export default DesktopHeader;
