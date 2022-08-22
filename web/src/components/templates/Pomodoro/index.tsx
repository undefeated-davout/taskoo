import { useEffect, useState } from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
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

const timerStatusConst: { [key: string]: number } = {
  unset: 0,
  working: 1,
  stopped: 2,
  done: 80,
};

const Pomodoro = (props: PomodoroProps) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [status, setStatus] = useState(timerStatusConst.unset);
  let timer: NodeJS.Timer;

  const seconds = (minutes: number) => minutes * 60;

  const progress = (timerSeconds: number, passedSeconds: number) =>
    timerSeconds === 0 ? 100 : (passedSeconds * 100) / timerSeconds;

  const title = (timerStatus: number) => {
    const minutes = (seconds: number) => Math.floor(seconds / 60);
    const timeFormat = (seconds: number) =>
      seconds <= 60 ? `${seconds} sec` : `${minutes(seconds)} min`;
    const remainSeconds = () => seconds(timerMinutes) - passedSeconds;

    if (timerStatus === timerStatusConst.unset) {
      return 'SELECT TIMER';
    } else if (
      timerStatus === timerStatusConst.working ||
      timerStatus === timerStatusConst.stopped
    ) {
      return timeFormat(remainSeconds());
    } else {
      return `${timeFormat(seconds(timerMinutes))} OVER`;
    }
  };

  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setPassedSeconds(0);
    playAlerm();
    setStatus(timerStatusConst.working);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setStatus(timerStatusConst.stopped);
  };

  const resumeTimer = () => {
    setStatus(timerStatusConst.working);
  };

  const deleteTimer = () => {
    setTimerMinutes(0);
    setPassedSeconds(0);
    clearInterval(timer);
    setStatus(timerStatusConst.unset);
  };

  // タイマーがセットされたかを監視
  useEffect(() => {
    // タイマー分が指定されているか、動作中ならタイマーをセットする
    if (timerMinutes === 0 || status !== timerStatusConst.working) return;
    const timerSeconds = seconds(timerMinutes);
    timer = setInterval(() => {
      setPassedSeconds((prev) => (prev < timerSeconds ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerMinutes, status]);

  // タイマー動作中監視
  useEffect(() => {
    // タイマーが動作している時のみ対象
    if (timerMinutes === 0 || timerMinutes === 0) return;
    if (status !== timerStatusConst.working) return;
    if (seconds(timerMinutes) === passedSeconds) {
      playAlerm();
      clearInterval(timer);
      setStatus(timerStatusConst.done);
    }
  }, [passedSeconds, timerMinutes, status]);

  return (
    <CenterContainerBox>
      <Box sx={{ maxWidth: 500, width: '100%' }}>
        <Card sx={{ p: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {title(status)}
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
            {status === timerStatusConst.working ||
            status === timerStatusConst.stopped ? (
              <>
                {status === timerStatusConst.working ? (
                  <BaseButton color="error" onClick={() => stopTimer()}>
                    <StopCircleOutlinedIcon />
                  </BaseButton>
                ) : (
                  <BaseButton color="success" onClick={() => resumeTimer()}>
                    <PlayCircleOutlineOutlinedIcon />
                  </BaseButton>
                )}

                <BaseButton onClick={() => deleteTimer()}>
                  <DeleteOutlinedIcon />
                </BaseButton>
              </>
            ) : (
              <>
                {[0.2, 5, 10, 15, 25].map((minutes, _) => (
                  <BaseButton
                    key={minutes.toString()}
                    onClick={() => startTimer(minutes)}
                  >
                    {minutes}min
                  </BaseButton>
                ))}
              </>
            )}
          </CardActions>
        </Card>
      </Box>
    </CenterContainerBox>
  );
};

export default Pomodoro;
