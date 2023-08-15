import { useState } from 'react';
import {
  Box,
  DialogContent,
  Popover,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';

import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import { Modals, Task } from '../../types';
import ViewSubtask from '../ViewSubtask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const ViewTask: React.FC<{
  taskData?: Task;
  columnId: string;
}> = ({ taskData, columnId }) => {
  const { closeModal, updateTask, openModal } = useActions();
  const { loading, selectedBoard } = useSelector((state) => state.boards);
  const [currColumnId, setCurrColumnId] = useState(columnId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const currColumn = selectedBoard?.columns?.find(
    (column) => column.id === currColumnId
  );

  if (!taskData) {
    console.error('No task data found');
    return null;
  }

  const completedSubTasks = taskData.subtasks.filter(
    (task) => task.isCompleted
  );
  const statusOptions = selectedBoard?.columns?.map((column) => ({
    name: column.name,
    id: column.id,
  }));

  const handleChange = async (event: SelectChangeEvent<string>) => {
    if (selectedBoard && currColumn) {
      await updateTask({
        boardId: selectedBoard?.id,
        columnId: currColumn?.id,
        taskId: taskData.id,
        title: taskData.title,
        description: taskData.description,
        subtasks: taskData.subtasks,
        destinationColumnId: event.target.value,
      });
    }
    setCurrColumnId(event.target.value);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h3">{taskData.title}</Typography>
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
                    closeModal();
                    openModal(Modals.EDIT_TASK, {
                      taskData,
                      columnId: currColumnId,
                    });
                  }}
                  sx={{ minWidth: '192px' }}
                >
                  Edit Task
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    closeModal();
                    openModal(Modals.DELETE_TASK, {
                      taskData,
                      columnId: currColumnId,
                    });
                  }}
                  sx={{ minWidth: '192px', color: 'error.main' }}
                >
                  Delete Task
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </Box>
        <Box mt={1}>
          <Typography color="text.secondary" variant="body1">
            {taskData.description}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography fontWeight="bold" color="text.primary" variant="body1">
            Subtasks ({completedSubTasks.length}
            &nbsp;of&nbsp;
            {taskData.subtasks.length})
          </Typography>
          {taskData.subtasks.map((subtask) => (
            <ViewSubtask
              key={subtask.id}
              columnId={currColumnId}
              taskId={taskData.id}
              subtask={subtask}
            />
          ))}
        </Box>
        <Box mt={2}>
          <Typography fontWeight="bold" color="text.primary" variant="body1">
            Current Status
          </Typography>
          <Select
            name="status"
            fullWidth
            value={currColumnId}
            onChange={handleChange}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {statusOptions?.map?.((column) => (
              <MenuItem key={column.id} value={column.id}>
                {column.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>
    </>
  );
};

export default ViewTask;
