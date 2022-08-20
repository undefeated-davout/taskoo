import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import MyThemeProvider from 'components/templates/MyThemeProvider';

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

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [displayReadyFlag, setDisplayReadyFlag] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      let isLoggedIn = !!user;
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
      setDisplayReadyFlag(true);
    })();
  }, [router, router.pathname]);

  return (
    <>
      <MyThemeProvider>
        <GlobalStyle />
        {displayReadyFlag && <Component {...pageProps} />}
      </MyThemeProvider>
    </>
  );
};

export default MyApp;
