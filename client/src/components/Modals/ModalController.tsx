import { useSelector } from '../../hooks/useTypedSelector';
import { Modals } from '../../types';
import DeleteBoard from './DeleteBoard';
import DeleteTask from './DeleteTask';
import EditBoard from './EditBoard';
import EditTask from './EditTask';
import ViewTask from './ViewTask';
import MobileBoardList from './MobileBoardList';
import { useActions } from '../../hooks/useActions';
import { Dialog, useTheme } from '@mui/material';

const ModalController: React.FC = () => {
  const { openModal } = useSelector((state) => state.boards);
  const { closeModal } = useActions();
  const theme = useTheme();

  const isMobile = theme.breakpoints.down('md');

  let modal;
  switch (openModal?.type) {
    case Modals.ADD_BOARD:
      modal = <EditBoard mode="create" />;
      break;
    case Modals.EDIT_BOARD:
      modal = <EditBoard mode="edit" />;
      break;
    case Modals.DELETE_BOARD:
      modal = <DeleteBoard />;
      break;
    case Modals.ADD_TASK:
      modal = <EditTask mode="add" />;
      break;
    case Modals.EDIT_TASK:
      modal = (
        <EditTask
          mode="edit"
          taskData={openModal?.modalData?.taskData}
          columnId={openModal?.modalData?.columnId}
        />
      );
      break;
    case Modals.DELETE_TASK:
      modal = (
        <DeleteTask
          taskData={openModal?.modalData?.taskData}
          columnId={openModal?.modalData?.columnId}
        />
      );
      break;
    case Modals.VIEW_TASK:
      modal = (
        <ViewTask
          taskData={openModal?.modalData?.taskData}
          columnId={openModal?.modalData?.columnId}
        />
      );
      break;
    case Modals.MOBILE_BOARD_LIST:
      modal = <MobileBoardList />;
      break;
    default:
      return null;
  }

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      maxWidth="sm"
      PaperProps={{ style: { minWidth: isMobile ? '300px' : '420px' } }}
    >
      {modal}
    </Dialog>
  );
};

export default ModalController;
