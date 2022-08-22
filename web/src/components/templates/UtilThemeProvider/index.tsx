import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const UtilThemeProvider = ({ children }: Props) => {
  const defaultTheme = useTheme();
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: defaultTheme.palette.grey[100],
        dark: defaultTheme.palette.grey[400],
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default UtilThemeProvider;
