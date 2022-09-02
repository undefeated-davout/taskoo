import { User } from 'firebase/auth';
import { AppProps } from 'next/app';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle } from 'styled-components';

import RecoilDebugObserver from 'components/atoms/RecoilDebugObserver';
import UtilThemeProvider from 'components/templates/UtilThemeProvider';

import { getUser } from 'lib/api/user';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
      background: black;
    }
  }
`;

export const UtilContext = createContext<{
  user: User | null;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>> | null;
}>({ user: null, isMenuOpen: true, setIsMenuOpen: null });

const UtilApp = ({ Component, pageProps, router }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      let isLoggedIn = !!currentUser;
      if (
        isLoggedIn &&
        ['/', '/login', '/_error'].indexOf(router.pathname) > -1
      ) {
        // ログイン状態でloginページor不正なページにアクセスしたらトップページへリダイレクト
        router.push('/focus');
        return;
      } else if (!isLoggedIn && router.pathname !== '/login') {
        // ログアウト状態でloginページ以外にアクセスしたらloginページへリダイレクト
        router.push('/login');
        return;
      }
      setIsReady(true);
    })();
  }, [router, router.pathname]);

  return (
    <>
      <UtilThemeProvider>
        <RecoilRoot>
          <RecoilDebugObserver />
          <DndProvider backend={HTML5Backend}>
            <UtilContext.Provider
              value={{
                user: user,
                isMenuOpen: isMenuOpen,
                setIsMenuOpen: setIsMenuOpen,
              }}
            >
              <GlobalStyle />
              {isReady && <Component {...pageProps} />}
            </UtilContext.Provider>
          </DndProvider>
        </RecoilRoot>
      </UtilThemeProvider>
    </>
  );
};

export default UtilApp;
