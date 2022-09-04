import { Dispatch, SetStateAction, createContext, useState } from 'react';

export const UtilContext = createContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isMenuOpen: null as unknown as boolean,
  setIsMenuOpen: null as unknown as Dispatch<SetStateAction<boolean>>,
});

type UtilContextProviderProps = {
  children: React.ReactNode;
};

const UtilContextProvider = (props: UtilContextProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <UtilContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {props.children}
    </UtilContext.Provider>
  );
};

export default UtilContextProvider;
