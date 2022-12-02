import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

type CircularStaticProps = {
  progress: number;
  sx?: SxProps<Theme>;
};

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number; wrapSx?: SxProps<Theme> }) => {
  return (
    <Box sx={props.wrapSx}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" color="success" size="4rem" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const CircularStatic = (props: CircularStaticProps) => {
  return <CircularProgressWithLabel value={props.progress} wrapSx={props.sx} />;
};

export default CircularStatic;
