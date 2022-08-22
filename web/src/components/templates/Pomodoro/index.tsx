import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import BaseButton from 'components/atoms/BaseButton';
import CenterContainerBox from 'components/atoms/CenterContainerBox';

import { playAlerm } from 'lib/util/audio';

type PomodoroProps = {};

const Pomodoro = (props: PomodoroProps) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [isAlermDone, setIsAlermDone] = useState(false); // アラーム鳴動したらtrue

  const seconds = (minutes: number) => minutes * 60;
  const minuts = (seconds: number) => Math.floor(seconds / 60);
  const remainSeconds = () => seconds(timerMinutes) - passedSeconds;
  const timeFormat = (seconds: number) =>
    seconds <= 60 ? `${seconds} sec` : `${minuts(seconds)} min`;
  const progress = (timerSeconds: number, passedSeconds: number) =>
    (passedSeconds * 100) / timerSeconds;

  const timerStatusConst: { [key: string]: number } = {
    notWorking: 0,
    working: 1,
    done: 80,
  };

  const timerStatus = () => {
    // タイマー未セット
    if (timerMinutes === 0) return timerStatusConst.notWorking;
    // タイマー起動中
    if (remainSeconds() > 0) return timerStatusConst.working;
    // タイマー終了
    return timerStatusConst.done;
  };

  const timerTitle = (timerStatus: number) => {
    if (timerStatus === timerStatusConst.notWorking) return 'SELECT TIMER';
    if (timerStatus === timerStatusConst.working)
      return timeFormat(remainSeconds());
    return `${timeFormat(seconds(timerMinutes))} OVER`;
  };

  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setPassedSeconds(0);
    playAlerm();
    setIsAlermDone(false);
  };

  let timer: NodeJS.Timer;
  // タイマーがセットされたかを監視
  useEffect(() => {
    const timerSeconds = seconds(timerMinutes);
    timer = setInterval(() => {
      setPassedSeconds((prev) => (prev < timerSeconds ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerMinutes, passedSeconds]);

  // タイマー動作中監視
  useEffect(() => {
    // タイマーが動作している時のみ対象
    if (timerMinutes === 0 || timerMinutes === 0) return;
    if (isAlermDone) return; // アラーム未鳴動なら対象
    if (seconds(timerMinutes) === passedSeconds) {
      playAlerm();
      clearInterval(timer);
      setIsAlermDone(true);
    }
  }, [passedSeconds, timerMinutes, isAlermDone]);

  return (
    <CenterContainerBox>
      <Box sx={{ maxWidth: 500, width: '100%' }}>
        <Card sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {timerTitle(timerStatus())}
            </Typography>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <CircularProgress
                variant="determinate"
                size="12rem"
                color="success"
                value={progress(seconds(timerMinutes), passedSeconds)}
              />
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {[0.2, 5, 10, 15, 25].map((minutes, _) => (
              <BaseButton
                key={minutes.toString()}
                onClick={() => startTimer(minutes)}
                color={timerMinutes === minutes ? 'success' : 'primary'}
              >
                {minutes}min
              </BaseButton>
            ))}
          </CardActions>
        </Card>
      </Box>
    </CenterContainerBox>
  );
};

export default Pomodoro;
