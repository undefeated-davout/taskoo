import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import BaseButton from 'components/atoms/BaseButton';

type PomodoroProps = {};

const Pomodoro = (props: PomodoroProps) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const seconds = (minutes: number) => minutes * 60;
  const minuts = (seconds: number) => Math.floor(seconds / 60);
  const remainSeconds = () => seconds(timerMinutes) - passedSeconds;
  const timeFormat = (seconds: number) => {
    return seconds <= 60 ? `${seconds} sec` : `${minuts(seconds)} min`;
  };
  const progress = (timerSeconds: number, passedSeconds: number) =>
    (passedSeconds * 100) / timerSeconds;

  const timerTitle = () => {
    // タイマー未セット
    if (timerMinutes === 0) {
      return 'SELECT TIMER';
    }
    // タイマー起動中
    if (remainSeconds() > 0) {
      return timeFormat(remainSeconds());
    }
    // タイマー終了
    return `${timeFormat(seconds(timerMinutes))} OVER`;
  };

  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setPassedSeconds(0);
  };

  // タイマーがセットされると起動
  useEffect(() => {
    const timer = setInterval(() => {
      const timerSeconds = seconds(timerMinutes);
      setPassedSeconds((prev) => (prev < timerSeconds ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerMinutes]);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{ minHeight: '100%' }}
      >
        <Grid item xs={12}>
          <Card sx={{ minWidth: 400 }}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  {timerTitle()}
                </Typography>
                <Box sx={{ mt: 3 }}></Box>
                <CircularProgress
                  variant="determinate"
                  size="12rem"
                  color="success"
                  value={progress(seconds(timerMinutes), passedSeconds)}
                />
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {[0.1, 5, 10, 15, 25].map((minutes, _) => (
                  <BaseButton
                    key={minutes.toString()}
                    onClick={() => startTimer(minutes)}
                    color={timerMinutes === minutes ? 'success' : 'primary'}
                  >
                    {minutes}min
                  </BaseButton>
                ))}
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Pomodoro;
