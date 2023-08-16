import { Box, Typography } from '@mui/material';
import BoardTask from './BoardTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Column } from '../types';

const BoardColumns: React.FC<{ column: Column }> = ({ column }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {column.name} ({column.tasks.length})
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
            style={{ width: '300px', height: '100%' }}
          >
            <Box>
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BoardTask
                        key={task.id}
                        task={task}
                        columnId={column.id}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
            </Box>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default BoardColumns;
