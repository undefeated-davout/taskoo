import { ThemeProvider, createTheme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function MyThemeProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
