import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, Mock } from 'vitest';
import useAuth from '../hooks/useAuth';

import Navbar from './Navbar';

vi.mock('../hooks/useAuth', () => {
  return {
    default: vi.fn(),
  };
});
describe('Navbar', () => {
  it('Has Correct Navbar Displaying When Logged Out', () => {
    (useAuth as Mock).mockReturnValue({
      isLoggedIn: false,
    });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Home')).toBeNull();
    expect(screen.queryByText('Logout')).toBeNull();
    expect(screen.getByTestId('navbar-login-text')).toHaveTextContent('Login');
    expect(screen.getByTestId('navbar-login-link')).toHaveAttribute(
      'href',
      '/login',
    );
    expect(screen.getByTestId('navbar-register-link')).toHaveAttribute(
      'href',
      '/register',
    );
    expect(screen.getByTestId('navbar-register-text')).toHaveTextContent(
      'Register',
    );
    expect(screen.getByTestId('navbar-logo-text')).toHaveTextContent(
      'BetterReads',
    );
    expect(screen.getByTestId('navbar-logo-link')).toHaveAttribute('href', '/');
  });

  it('Has Correct Navbar Displaying When Logged In', async () => {
    (useAuth as Mock).mockReturnValue({
      isLoggedIn: true,
    });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    expect(screen.queryByText('Login')).toBeNull();
    expect(screen.queryByText('Register')).toBeNull();
    expect(screen.getByTestId('navbar-logo-text')).toHaveTextContent(
      'BetterReads',
    );
    expect(screen.getByTestId('navbar-logo-link')).toHaveAttribute('href', '/');
    const logoutButton = screen.getByTestId('navbar-logout-text');
    expect(logoutButton).toHaveTextContent('Logout');
  });
});
