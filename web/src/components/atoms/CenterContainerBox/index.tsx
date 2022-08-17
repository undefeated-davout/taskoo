import Box from '@mui/material/Box';

type CenterContainerBoxProps = {
  children: React.ReactNode;
};

const CenterContainerBox = (props: CenterContainerBoxProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Box>
  );
};

export default CenterContainerBox;
