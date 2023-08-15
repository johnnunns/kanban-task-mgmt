import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';

const DeleteBoard: React.FC = () => {
  const { deleteBoard, closeModal, getBoardNames } = useActions();
  const { selectedBoard } = useSelector((state) => state.boards);
  const navigate = useNavigate();

  return (
    <>
      <DialogTitle>
        <Typography variant="h2" component="span" color="text.error">
          Delete This Board
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          Are you sure you want to delete the&nbsp;
          {selectedBoard?.name}
          &nbsp;board? This action will remove all columns and tasks and cannot
          be reversed.
        </Typography>
        <Box display="flex" mt={2}>
          <Button
            onClick={async () => {
              if (selectedBoard) {
                await deleteBoard(selectedBoard.id);
                await getBoardNames();
                closeModal();
                navigate('/');
              }
            }}
            color="error"
            variant="contained"
            fullWidth
            sx={{ mr: 1 }}
          >
            Delete
          </Button>
          <Button
            onClick={() => closeModal()}
            color="secondary"
            variant="contained"
            fullWidth
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </>
  );
};

export default DeleteBoard;
