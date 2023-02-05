import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import theme from './styles/theme';
import PageWithNavigation from './layout/PageWithNavigation';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { store } from './state/store/store';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Routes>
            <Route element={<PageWithNavigation />}>
              <Route path="/" element={<Homepage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Dashboard />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
