import {
  Button,
  TextField,
  Box,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Formik, Form, FieldArray } from 'formik';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import { useParams } from 'react-router-dom';

const EditBoard: React.FC<{ mode: string }> = ({ mode }) => {
  const { id } = useParams();
  const { createBoard, updateBoard, closeModal, getBoardNames } = useActions();
  const { loading, selectedBoard } = useSelector((state) => state.boards);
  const editMode = selectedBoard && mode === 'edit';

  const initialValues = !!editMode
    ? {
        name: selectedBoard.name,
        columns: selectedBoard.columns.length
          ? selectedBoard.columns
          : [{ name: '' }],
      }
    : {
        name: '',
        columns: [
          {
            name: '',
          },
        ],
      };

  const title = editMode ? 'Edit Board' : 'Add New Board';
  const subTitle = editMode ? 'Board Name' : 'Name';
  const actionText = editMode ? 'Save Changes' : 'Create New Board';

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (editMode && id) {
              await updateBoard(id, values.name, values.columns);
              await getBoardNames();
            } else {
              await createBoard({
                name: values.name,
                columns: values.columns,
              });
            }
            closeModal();
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Typography
                fontWeight="bold"
                color="text.primary"
                variant="body1"
              >
                {subTitle}
              </Typography>
              <TextField
                name="name"
                placeholder="e.g. Web Design"
                fullWidth
                variant="outlined"
                value={values.name}
                onChange={handleChange}
              />
              <Box mt={2}>
                <Typography
                  fontWeight="bold"
                  color="text.primary"
                  variant="body1"
                >
                  Columns
                </Typography>
              </Box>
              <FieldArray name="columns">
                {({ remove, push }) => (
                  <div>
                    {values.columns.length > 0 &&
                      values.columns.map((column, index) => (
                        <div className="row" key={index}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <TextField
                              name={`columns.${index}.name`}
                              value={column.name}
                              onChange={handleChange}
                              placeholder="e.g. Todo"
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
                        onClick={() => push({ name: '' })}
                      >
                        + Add New Column
                      </Button>
                    </Box>
                  </div>
                )}
              </FieldArray>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={!values.name || loading}
                >
                  {actionText}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
};

export default EditBoard;
