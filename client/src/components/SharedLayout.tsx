import { useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Link,
  Typography,
  Button,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Link as ReactRouterLink,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import DarkLogo from '../assets/logo-dark.svg';
import LightLogo from '../assets/logo-light.svg';
import { useActions } from '../hooks/useActions';
import { useSelector } from '../hooks/useTypedSelector';
import DesktopHeader from './DesktopHeader';
import ModalController from './Modals/ModalController';
import BoardList from './BoardList';
import MobileHeader from './MobileHeader';
import ModeSwitch from './ModeSwitch';

const drawerWidth = 240;
const headerHeight = 80;

const MuiAppBar = styled(AppBar)(({ theme }) => ({
  height: headerHeight,
  backgroundColor: theme.palette.background.paper,
  backgroundImage: 'none',
  position: 'fixed',
}));

const MuiDrawer = styled(Drawer)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    width: drawerWidth,
  },
}));

const SharedLayout: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { getBoardNames, toggleSidebar } = useActions();
  const { boards, app } = useSelector((state) => state);

  const { boardNames, selectedBoard } = boards;

  useEffect(() => {
    getBoardNames();
  }, []);

  useEffect(() => {
    if (!!boardNames.length && !id) {
      navigate(`/${boardNames[0].id}`);
    }

    if (selectedBoard && selectedBoard.id !== id) {
      navigate(`/${selectedBoard.id}`);
    }
  }, [boardNames]);

  const logo = (
    <Link component={ReactRouterLink} to="/">
      <img
        height={26}
        width={152}
        src={theme.palette.mode === 'dark' ? LightLogo : DarkLogo}
        alt="logo"
      />
    </Link>
  );

  return (
    <Box display="flex">
      <MuiAppBar>
        <Toolbar sx={{ minHeight: `${headerHeight}px !important` }}>
          {sm ? (
            <DesktopHeader name={selectedBoard?.name} logo={logo} />
          ) : (
            <MobileHeader />
          )}
        </Toolbar>
      </MuiAppBar>
      {sm && (
        <>
          {!app.showSidebar && (
            <Button
              onClick={() => toggleSidebar(true)}
              sx={{
                position: 'absolute',
                bottom: '30px',
                left: '-20px',
                paddingLeft: '30px',
                width: 90,
                height: 48,
                borderRadius: 17,
              }}
              color="primary"
              variant="contained"
            >
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          )}
          <MuiDrawer
            variant="persistent"
            open={app.showSidebar}
            onClose={() => toggleSidebar(false)}
            PaperProps={{
              style: {
                justifyContent: 'space-between',
                width: drawerWidth,
              },
            }}
          >
            <List disablePadding>
              <ListItem sx={{ height: headerHeight }}>{logo}</ListItem>
              <BoardList />
            </List>
            <List sx={{ padding: '10px' }}>
              <ModeSwitch />
              <ListItem disablePadding sx={{ color: 'text.secondary' }}>
                <ListItemButton
                  sx={{ px: 1, py: 2, my: 2 }}
                  onClick={() => toggleSidebar(false)}
                >
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                  <Typography sx={{ ml: 1 }}>Hide Sidebar</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </MuiDrawer>
        </>
      )}
      <ModalController />
      <Box
        component="main"
        p={2}
        mt={`${headerHeight}px`}
        flexGrow={1}
        marginTop={`${headerHeight}px`}
        minHeight={`calc(100vh - ${headerHeight}px)`}
        sx={{ overflowY: 'auto' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SharedLayout;
