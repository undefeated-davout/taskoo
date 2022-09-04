import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingCircular = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingCircular;
