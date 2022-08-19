import { User, onAuthStateChanged } from 'firebase/auth';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import MyThemeProvider from 'components/templates/MyThemeProvider';

import { auth } from 'lib/infrastructure/firebase';

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

// 認証情報を取得
const getUser = (): Promise<User | null> => {
  return new Promise((resolve, _) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [displayReadyFlag, setDisplayReadyFlag] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      let isLoggedIn = !!user;
      if (isLoggedIn && ['/login', '/_error'].indexOf(router.pathname) > -1) {
        // ログイン状態でloginページor不正なページにアクセスしたらトップページへリダイレクト
        router.push('/focus');
        return;
      } else if (!isLoggedIn && router.pathname !== '/login') {
        // ログアウト状態でloginページ以外にアクセスしたらloginページへリダイレクト
        router.push('/login');
        return;
      }
      setDisplayReadyFlag(true);
    })();
  }, [router.pathname]);

  if (!displayReadyFlag) {
    return <></>;
  }

  return (
    <>
      <MyThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </MyThemeProvider>
    </>
  );
};

export default MyApp;
