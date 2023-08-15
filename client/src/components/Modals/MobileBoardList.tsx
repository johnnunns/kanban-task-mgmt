import { DialogContent, Box } from '@mui/material';
import BoardList from '../BoardList';
import ModeSwitch from '../ModeSwitch';

const MobileBoardList: React.FC = () => {
  return (
    <>
      <DialogContent sx={{ pl: 0 }}>
        <BoardList isMobile={true} />
        <Box pl={3} mt={2}>
          <ModeSwitch />
        </Box>
      </DialogContent>
    </>
  );
};

export default MobileBoardList;
