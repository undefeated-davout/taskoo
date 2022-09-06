import Box from '@mui/material/Box';

type HorizontalCenterContainerBoxProps = {
  children: React.ReactNode;
};

const HorizontalCenterContainerBox = (props: HorizontalCenterContainerBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {props.children}
    </Box>
  );
};

export default HorizontalCenterContainerBox;
