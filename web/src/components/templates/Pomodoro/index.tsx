import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CountDown from 'components/organisms/CountDown';
import BaseButton from 'components/atoms/BaseButton';

type PomodoroProps = {};

const Pomodoro = (props: PomodoroProps) => {
  return (
    <>
      <Card sx={{ minWidth: 275, with: 100, maxHeight: 400, m: '0 auto' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            SELECT TIMER
          </Typography>

          <CountDown></CountDown>
        </CardContent>

        <CardActions>
          <BaseButton>0.5m</BaseButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Pomodoro;
