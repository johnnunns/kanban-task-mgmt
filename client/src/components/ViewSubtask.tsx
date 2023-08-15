import { Typography, Paper, Checkbox } from '@mui/material';
import { useState } from 'react';
import { Subtask } from '../types';
import { useSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const ViewSubtask: React.FC<{
  columnId: string;
  taskId: string;
  subtask: Subtask;
}> = ({ columnId, taskId, subtask }) => {
  const [checked, setChecked] = useState(subtask.isCompleted || false);
  const { loading, selectedBoard } = useSelector((state) => state.boards);
  const { updateSubtask } = useActions();

  const handleCheck = () => {
    if (selectedBoard) {
      updateSubtask({
        boardId: selectedBoard?.id,
        columnId,
        taskId,
        subtaskId: subtask.id,
        isCompleted: !checked,
        title: subtask.title,
      });
    }

    setChecked(!checked);
  };

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <Checkbox
        color="primary"
        disabled={loading}
        checked={checked}
        onChange={handleCheck}
      />
      <Typography
        variant="body1"
        color={checked ? 'text.secondary' : 'text.primary'}
        sx={{ ml: 1 }}
      >
        {subtask.title}
      </Typography>
    </Paper>
  );
};

export default ViewSubtask;
