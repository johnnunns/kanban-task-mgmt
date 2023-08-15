import { ListItem, Switch, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useActions } from '../hooks/useActions';

const ModeSwitch: React.FC = () => {
  const theme = useTheme();
  const { toggleMode } = useActions();
  return (
    <ListItem
      sx={{
        backgroundColor: theme.palette.background.default,
        color: 'text.secondary',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
      }}
    >
      <FontAwesomeIcon icon={faSun} size="xl" />
      <Switch
        color="primary"
        checked={theme.palette.mode === 'dark' || false}
        onChange={toggleMode}
      />
      <FontAwesomeIcon icon={faMoon} size="xl" />
    </ListItem>
  );
};

export default ModeSwitch;
