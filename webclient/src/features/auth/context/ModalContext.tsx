import { createContext, useMemo, useState } from 'react';

type ModalContextValues = {
  email?: string;
  password?: string;
  view?: number;
  isOpen: boolean;
};
export const ModalContext = createContext<ModalContextValues>({
  email: '',
  password: '',
  view: 0,
  isOpen: true,
});
type Props = {
  children: React.ReactNode[];
};
function ModalContextProvider({ children }: Props) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [view, setView] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const valuePassedDown = useMemo(
    () => ({ ...formValues, view, isOpen, setIsOpen }),
    [formValues, view, isOpen],
  );
  return (
    <ModalContext.Provider value={valuePassedDown}>
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
