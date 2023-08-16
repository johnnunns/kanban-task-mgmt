import { Paper, Typography, ButtonBase } from '@mui/material';
import { Modals, Task } from '../types';
import { useActions } from '../hooks/useActions';

const BoardTask: React.FC<{ task: Task; columnId: string }> = ({
  task,
  columnId,
}) => {
  const completedSubTasks = task.subtasks.filter((task) => task.isCompleted);
  const { openModal } = useActions();

  return (
    <Paper sx={{ mt: 2, p: 2.5, width: '100%' }}>
      <ButtonBase
        disableRipple
        sx={{
          width: '100%',
          justifyContent: 'flex-start',
          '&:hover': {
            color: 'primary.main',
          },
        }}
        onClick={() =>
          openModal(Modals.VIEW_TASK, { taskData: task, columnId })
        }
      >
        <Typography sx={{ textAlign: 'left' }} variant="h3">
          {task.title}
        </Typography>
      </ButtonBase>
      {task.subtasks.length ? (
        <Typography color="text.secondary">
          {completedSubTasks.length}
          &nbsp;of&nbsp;
          {task.subtasks.length}
          &nbsp;subtasks
        </Typography>
      ) : null}
    </Paper>
  );
};

export default BoardTask;
