import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import queryClient from '../api/queryClient';
import { getMe, userLogin, userLogout, userRegister } from '../api/user';
import { LoginData, RegisterData } from '../types';
import useLocalStorage from './useLocalStorage';

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('loggedIn', false);
  const [loginError, setLoginError] = useState('');
  const loginErrorTimeoutRef = useRef<
    string | number | NodeJS.Timeout | undefined
  >();
  const [registerError, setRegisterError] = useState('');
  const registerErrorTimeoutRef = useRef<
    string | number | NodeJS.Timeout | undefined
  >();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    onError: () => {
      setIsLoggedIn(false);
      queryClient.cancelQueries({ queryKey: ['userbooks'] });
      queryClient.cancelQueries({ queryKey: ['usershelves'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
    },
  });
  const {
    mutate: login,
    error: loginAxiosError,
    isLoading: loginIsLoading,
  } = useMutation({
    mutationFn: (params: LoginData) => userLogin(params),
    onSuccess: () => {
      setIsLoggedIn(true);
    },
    onError: (err) => {
      setIsLoggedIn(false);
      queryClient.cancelQueries({ queryKey: ['userbooks'] });
      queryClient.cancelQueries({ queryKey: ['usershelves'] });
      queryClient.cancelQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
      if (axios.isAxiosError(err)) {
        setLoginError(err.response?.data.message);
      }
    },
  });
  const {
    mutate: register,
    error: registerAxiosError,
    isLoading: registerIsLoading,
  } = useMutation({
    mutationFn: (params: RegisterData) => userRegister(params),
    onSuccess: () => {
      setIsLoggedIn(true);
    },
    onError: (err) => {
      setIsLoggedIn(false);
      queryClient.cancelQueries({ queryKey: ['userbooks'] });
      queryClient.cancelQueries({ queryKey: ['usershelves'] });
      queryClient.cancelQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
      if (axios.isAxiosError(err)) {
        setRegisterError(err.response?.data.message);
      }
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      setIsLoggedIn(false);
      queryClient.cancelQueries({ queryKey: ['userbooks'] });
      queryClient.cancelQueries({ queryKey: ['usershelves'] });
      queryClient.cancelQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
    },
    onError: () => {
      setIsLoggedIn(false);
      queryClient.cancelQueries({ queryKey: ['userbooks'] });
      queryClient.cancelQueries({ queryKey: ['usershelves'] });
      queryClient.cancelQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
    },
  });

  useEffect(() => {
    clearTimeout(loginErrorTimeoutRef.current);
    if (loginError) {
      loginErrorTimeoutRef.current = setTimeout(() => setLoginError(''), 3000);
    }
    return () => clearTimeout(loginErrorTimeoutRef.current);
  }, [loginError, loginAxiosError]);

  useEffect(() => {
    clearTimeout(registerErrorTimeoutRef.current);
    if (registerError) {
      registerErrorTimeoutRef.current = setTimeout(
        () => setRegisterError(''),
        3000,
      );
    }
    return () => clearTimeout(registerErrorTimeoutRef.current);
  }, [registerError, registerAxiosError]);

  return {
    isLoggedIn,
    login,
    loginError,
    loginIsLoading,
    register,
    registerError,
    registerIsLoading,
    logout,
    user,
  };
}
export default useAuth;
