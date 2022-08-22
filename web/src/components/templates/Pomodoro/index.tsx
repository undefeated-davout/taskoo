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

const timerMinutesList = [0.2, 5, 10, 15, 25];

const statusConst: { [key: string]: number } = {
  unset: 0,
  working: 1,
  stopped: 2,
  done: 80,
};

const Pomodoro = (props: PomodoroProps) => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [status, setStatus] = useState(statusConst.unset);
  let timer: NodeJS.Timer;

  const progress = (timerSeconds: number, passedSeconds: number) =>
    timerSeconds === 0 ? 100 : (passedSeconds * 100) / timerSeconds;

  const title = (timerStatus: number) => {
    const minutes = (seconds: number) => Math.floor(seconds / 60);
    const timeFormat = (seconds: number) =>
      seconds <= 60 ? `${seconds} sec` : `${minutes(seconds)} min`;
    const remainSeconds = () => timerSeconds - passedSeconds;

    if (timerStatus === statusConst.unset) {
      return 'SELECT TIMER';
    } else if (
      timerStatus === statusConst.working ||
      timerStatus === statusConst.stopped
    ) {
      return timeFormat(remainSeconds());
    } else {
      return `${timeFormat(timerSeconds)} OVER`;
    }
  };

  const startTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setPassedSeconds(0);
    setStatus(statusConst.working);
    playAlerm();
  };

  const stopTimer = () => {
    clearInterval(timer);
    setStatus(statusConst.stopped);
  };

  const resumeTimer = () => {
    setStatus(statusConst.working);
  };

  const deleteTimer = () => {
    clearInterval(timer);
    setTimerSeconds(0);
    setPassedSeconds(0);
    setStatus(statusConst.unset);
  };

  // タイマーがセットされたかを監視
  useEffect(() => {
    // タイマー分が指定されているか、動作中ならタイマーをセットする
    if (timerSeconds === 0 || status !== statusConst.working) return;
    timer = setInterval(() => {
      setPassedSeconds((prev) => (prev < timerSeconds ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timerSeconds, status]);

  // タイマー動作中監視
  useEffect(() => {
    // タイマーが動作中に、指定時間以上経過したら対象
    if (!(status === statusConst.working && passedSeconds >= timerSeconds))
      return;
    clearInterval(timer);
    setStatus(statusConst.done);
    playAlerm();
  }, [timerSeconds, passedSeconds, status]);

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
                color={status === statusConst.working ? 'success' : 'secondary'}
                value={progress(timerSeconds, passedSeconds)}
              />
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {status === statusConst.working ||
            status === statusConst.stopped ? (
              <>
                {status === statusConst.working ? (
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
                {timerMinutesList.map((minutes, _) => (
                  <BaseButton
                    key={minutes.toString()}
                    onClick={() => startTimer(minutes * 60)}
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
