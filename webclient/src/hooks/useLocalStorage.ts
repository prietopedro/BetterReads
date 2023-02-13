import { useEffect, useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialState: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [data, setData] = useState<T>(() => {
    if (localStorage.getItem(key))
      return JSON.parse(localStorage.getItem(key) || '');
    return initialState;
  });
  useEffect(() => {
    if (!data) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData];
}

export default useLocalStorage;
