import { ThemeProvider, createTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const UtilThemeProvider = ({ children }: Props) => {
  // const defaultTheme = useTheme();
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default UtilThemeProvider;
