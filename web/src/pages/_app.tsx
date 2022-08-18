import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import MyThemeProvider from 'components/templates/MyThemeProvider';

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

const MyApp = ({ Component, pageProps }: AppProps) => {
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
