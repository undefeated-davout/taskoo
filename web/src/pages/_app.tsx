import { User } from 'firebase/auth';
import { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createGlobalStyle } from 'styled-components';

import LoadingCircular from 'components/atoms/LoadingCircular';

import LoggedOut from 'containers/templates/LoggedOut';

import { getUser } from 'lib/api/user';
import KanbanTaskContextProvider from 'lib/contexts/KanbanTaskContextProvider';
import UtilContextProvider from 'lib/contexts/UtilContextProvider';
import UtilThemeProvider from 'lib/contexts/UtilThemeProvider';

export const UserContext = createContext<{ user: User | null }>({ user: null });

const UtilApp = ({ Component, pageProps, router }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      let isLoggedIn = !!currentUser;
      if (isLoggedIn && ['/', '/login', '/_error'].indexOf(router.pathname) > -1) {
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
        <DndProvider backend={HTML5Backend}>
          <UtilContextProvider>
            <UserContext.Provider value={{ user }}>
              <KanbanTaskContextProvider>
                <GlobalStyle />
                {isReady ? (
                  <Component {...pageProps} />
                ) : (
                  <LoggedOut>
                    <LoadingCircular />
                  </LoggedOut>
                )}
              </KanbanTaskContextProvider>
            </UserContext.Provider>
          </UtilContextProvider>
        </DndProvider>
      </UtilThemeProvider>
    </>
  );
};

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

export default UtilApp;
