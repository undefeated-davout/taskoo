import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

export default function MyThemeProvider({ children }: Props) {
  const defaultTheme = useTheme();

  // defaultTheme.palette.action.disabledBackground

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
