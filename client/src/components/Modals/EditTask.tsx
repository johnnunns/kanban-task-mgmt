import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import { Subtask, Task } from '../../types';

const EditTask: React.FC<{
  mode: string;
  taskData?: Task;
  columnId?: string;
}> = ({ mode, taskData, columnId }) => {
  const { createTask, closeModal, updateTask } = useActions();
  const [currColumnId, setCurrColumnId] = useState(columnId);
  const { loading, selectedBoard } = useSelector((state) => state.boards);
  const editMode = mode === 'edit' && !!taskData;
  const statuses = selectedBoard?.columns?.map((column) => ({
    name: column.name,
    id: column.id,
  }));

  const initialValues =
    !!editMode && taskData
      ? {
          title: taskData.title,
          description: taskData.description,
          subtasks: !!taskData.subtasks.length
            ? taskData.subtasks
            : [{ title: '' }],
          status: currColumnId,
        }
      : {
          title: '',
          description: '',
          status: '',
          subtasks: [
            {
              title: '',
            },
          ],
        };

  const title = editMode ? 'Edit Task' : 'Add New Task';
  const actionText = editMode ? 'Save Changes' : 'Create Task';

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (!editMode && selectedBoard && values.status) {
              await createTask({
                boardId: selectedBoard?.id,
                columnId: values.status,
                title: values.title,
                description: values.description,
                subtasks: values.subtasks as Subtask[],
              });
            } else if (editMode && selectedBoard && currColumnId) {
              await updateTask({
                boardId: selectedBoard?.id,
                columnId: currColumnId,
                taskId: taskData.id,
                title: values.title,
                description: values.description,
                subtasks: values.subtasks as Subtask[],
                destinationColumnId:
                  currColumnId !== values.status ? values.status : undefined,
              });
              setCurrColumnId(values.status);
            } else {
              console.error('No updates to task made');
            }
            closeModal();
          }}
        >
          {({ values, handleChange }) => {
            return (
              <Form>
                <Typography
                  fontWeight="bold"
                  color="text.primary"
                  variant="body1"
                >
                  Title
                </Typography>
                <TextField
                  name="title"
                  placeholder="e.g. Take coffee break"
                  fullWidth
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                />
                <Box mt={2}>
                  <Typography
                    fontWeight="bold"
                    color="text.primary"
                    variant="body1"
                  >
                    Description
                  </Typography>
                  <TextField
                    name="description"
                    placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                  recharge the batteries a little."
                    fullWidth
                    multiline
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </Box>
                <Box mt={2}>
                  <Typography
                    fontWeight="bold"
                    color="text.primary"
                    variant="body1"
                  >
                    Subtasks
                  </Typography>
                </Box>
                <FieldArray name="subtasks">
                  {({ remove, push }) => (
                    <div>
                      {values.subtasks.length > 0 &&
                        values.subtasks.map((subtask, index) => (
                          <div className="row" key={index}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <TextField
                                name={`subtasks.${index}.title`}
                                value={subtask.title}
                                onChange={handleChange}
                                placeholder="e.g. Make Coffee"
                                variant="outlined"
                                fullWidth
                              />
                              <IconButton
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                                sx={{ mr: -1, ml: 1 }}
                              >
                                <Close />
                              </IconButton>
                            </Box>
                          </div>
                        ))}
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => push({ title: '' })}
                        >
                          + Add New Subtask
                        </Button>
                      </Box>
                    </div>
                  )}
                </FieldArray>
                <Box mt={2}>
                  <Typography
                    fontWeight="bold"
                    color="text.primary"
                    variant="body1"
                  >
                    Status
                  </Typography>
                  <Select
                    name="status"
                    fullWidth
                    value={values.status}
                    onChange={handleChange}
                  >
                    {statuses?.map((status) => (
                      <MenuItem key={status.id} value={status.id}>
                        {status.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={!values.title || !values.status || loading}
                  >
                    {actionText}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </>
  );
};

export default EditTask;
