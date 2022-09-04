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
import { createGlobalStyle } from 'styled-components';

import UtilThemeProvider from 'components/templates/UtilThemeProvider';

import { kanbanTaskStateType } from 'types/task';

import { getUser } from 'lib/api/user';



export const UtilContext = createContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isMenuOpen: null as unknown as boolean,
  setIsMenuOpen: null as unknown as Dispatch<SetStateAction<boolean>>,
});

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const KanbanTaskContext = createContext<{
  kanbanTask: kanbanTaskStateType | null;
  setKanbanTask: Dispatch<SetStateAction<kanbanTaskStateType | null>>;
}>({
  kanbanTask: null,
  setKanbanTask: null as unknown as Dispatch<
    SetStateAction<kanbanTaskStateType | null>
  >,
});

const UtilApp = ({ Component, pageProps, router }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [kanbanTask, setKanbanTask] = useState<kanbanTaskStateType | null>(
    null,
  );
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
        <DndProvider backend={HTML5Backend}>
          <UtilContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
            <UserContext.Provider value={{ user }}>
              <KanbanTaskContext.Provider value={{ kanbanTask, setKanbanTask }}>
                <GlobalStyle />
                {isReady && <Component {...pageProps} />}
              </KanbanTaskContext.Provider>
            </UserContext.Provider>
          </UtilContext.Provider>
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



