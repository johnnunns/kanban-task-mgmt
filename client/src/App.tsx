import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './muiTheme';
import { CssBaseline } from '@mui/material';
import ScrollToTop from './helpers/ScrollToTop';
import SharedLayout from './components/SharedLayout';
import Board from './pages/Home';
import { useSelector } from './hooks/useTypedSelector';

const App: React.FC = () => {
  const { mode } = useSelector((state) => state.app);
  const themeProvider = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeProvider}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/:id?" index element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
