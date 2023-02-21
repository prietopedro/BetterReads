import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import theme from './styles/theme';
import PageWithNavigation from './layout/PageWithNavigation';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import Search from './pages/Search';
import ShelvesPage from './pages/ShelvesPage';
import BookPage from './pages/BookPage';
import queryClient from './api/queryClient';
import BaseAuthModal from './features/auth/layout/BaseAuthModal';

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Routes>
            <Route element={<PageWithNavigation />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/shelves" element={<ShelvesPage />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<BaseAuthModal />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
