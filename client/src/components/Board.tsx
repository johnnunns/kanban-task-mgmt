import { useEffect } from 'react';
import { Box, Typography, ButtonBase, Paper, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelector';
import EmptyBoard from './EmptyBoard';
import BoardColumn from './BoardColumn';
import { Modals } from '../types';

const BoardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '20px',
  height: '100%',
  width: '100%',
  paddingRight: '24px',
  overflowX: 'auto',
}));

const Board: React.FC = () => {
  const { id } = useParams();
  const { getBoard, openModal, updateTask } = useActions();
  const { selectedBoard } = useSelector((state) => state.boards);

  useEffect(() => {
    if (id) {
      getBoard(id);
    }
  }, [id]);

  if (!selectedBoard?.columns?.length) {
    return <EmptyBoard />;
  }

  return (
    <BoardWrapper>
      <DragDropContext
        onDragEnd={async (details) => {
          const taskId = details.draggableId;
          const moveToColumnId = details.destination?.droppableId;
          const moveToColumnIndex = details.destination?.index;
          const currColumnId = details.source?.droppableId;
          await updateTask({
            boardId: selectedBoard?.id,
            columnId: currColumnId,
            taskId,
            destinationColumnId: moveToColumnId,
            destinationTaskIndex: moveToColumnIndex,
          });
        }}
      >
        {selectedBoard.columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </DragDropContext>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
          minWidth: 280,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? '#ECF2FB' : '#171824',
        }}
      >
        <ButtonBase
          sx={{ height: '100%', width: '100%' }}
          disableRipple
          onClick={() => openModal(Modals.EDIT_BOARD)}
        >
          <Typography
            color="text.secondary"
            variant="h1"
            sx={{ textAlign: 'center' }}
          >
            + New Column
          </Typography>
        </ButtonBase>
      </Paper>
    </BoardWrapper>
  );
};

export default Board;
