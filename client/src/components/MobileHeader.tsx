import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelector';
import { Modals } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Add } from '@mui/icons-material';
import Logo from '../assets/logo-mobile.svg';

const MobileHeader: React.FC = () => {
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
        <img src={Logo} height="25px" width="25px" alt="Logo" />
        {selectedBoard?.name && (
          <Button
            disableRipple
            onClick={() => openModal(Modals.MOBILE_BOARD_LIST)}
            endIcon={
              <Box component="span" mb={0.5} ml={0.25} color="primary.main">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ fontSize: '14px' }}
                />
              </Box>
            }
          >
            <Typography variant="h2" color="text.secondary">
              {selectedBoard.name}
            </Typography>
          </Button>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal(Modals.ADD_TASK)}
          disabled={!selectedBoard?.columns?.length}
        >
          <Add />
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

export default MobileHeader;
