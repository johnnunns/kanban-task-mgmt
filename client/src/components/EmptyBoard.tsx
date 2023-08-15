import { Box, Button, Typography } from '@mui/material';
import { Modals } from '../types';
import { useActions } from '../hooks/useActions';

const EmptyBoard: React.FC = () => {
  const { openModal } = useActions();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box textAlign="center">
        <Typography variant="h2" color="text.secondary">
          This board is empty. Create a new column to get started.
        </Typography>
        <Box mt={2}>
          <Button
            onClick={() => openModal(Modals.EDIT_BOARD)}
            variant="contained"
            color="primary"
          >
            + Add New Column
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyBoard;
