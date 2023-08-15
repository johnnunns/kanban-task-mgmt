import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import { Task } from '../../types';

const DeleteTask: React.FC<{ taskData: Task; columnId: string }> = ({
  taskData,
  columnId,
}) => {
  const { deleteTask, closeModal } = useActions();
  const { selectedBoard } = useSelector((state) => state.boards);

  return (
    <>
      <DialogTitle>
        <Typography variant="h2" component="span" color="text.error">
          Delete This Task
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          Are you sure you want to delete the {taskData?.title} task and its
          subtasks? This action cannot be reversed.
        </Typography>
        <Box display="flex" mt={2}>
          <Button
            onClick={async () => {
              if (selectedBoard) {
                await deleteTask({
                  boardId: selectedBoard.id,
                  columnId,
                  taskId: taskData.id,
                });
                closeModal();
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

export default DeleteTask;
