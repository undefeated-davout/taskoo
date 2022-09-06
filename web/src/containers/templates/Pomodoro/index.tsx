import { Timestamp } from 'firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { UserContext } from 'pages/_app';

import BaseButton from 'components/atoms/BaseButton';
import CenterContainerBox from 'components/atoms/CenterContainerBox';

import { timerType } from 'types/timer';

import { addTimer, deleteTimer, getTimer, updateTimer } from 'lib/api/timer';
import { timerStatusConst } from 'lib/constants/timer';
import { playAlerm } from 'lib/util/audio';

type PomodoroProps = {};

const timerMinutesList = [5, 10, 15, 25];

const Pomodoro = (props: PomodoroProps) => {
  const { user } = useContext(UserContext);

  const [status, setStatus] = useState(timerStatusConst.unset);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [timer, setTimer] = useState<timerType | null | undefined>(undefined);
  const timerRef = useRef<NodeJS.Timer>();

  const progress = (timerSeconds: number, passedSeconds: number) =>
    timerSeconds === 0 ? 100 : (passedSeconds * 100) / timerSeconds;
  const remainSeconds = () => timerSeconds - passedSeconds;

  const title = (timerStatus: number) => {
    const minutes = (seconds: number) => Math.floor(seconds / 60);
    const timeFormat = (seconds: number) => (seconds <= 60 ? `${seconds} sec` : `${minutes(seconds)} min`);

    if (timerStatus === timerStatusConst.unset) {
      return 'SELECT TIMER';
    } else if (timerStatus === timerStatusConst.working || timerStatus === timerStatusConst.stopped) {
      return timeFormat(remainSeconds());
    } else {
      return `${timeFormat(timerSeconds)} OVER`;
    }
  };

  const endAt = (seconds: number) => {
    const nowSeconds = Math.floor(new Date().getTime() / 1000);
    const endTimestamp = new Timestamp(nowSeconds + seconds, 0);
    return endTimestamp;
  };

  const startTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setPassedSeconds(0);
    setStatus(timerStatusConst.working);
    playAlerm();
    addTimer(user!.uid, {
      timerSeconds: seconds,
      status: timerStatusConst.working,
      endAt: endAt(seconds),
    });
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setStatus(timerStatusConst.stopped);
    updateTimer(user!.uid, timer!.id, {
      status: timerStatusConst.stopped,
      passedSeconds: passedSeconds,
      endAt: null,
    });
  };

  const resumeTimer = () => {
    setStatus(timerStatusConst.working);
    updateTimer(user!.uid, timer!.id, {
      status: timerStatusConst.working,
      passedSeconds: null,
    });
  };

  const discardTimer = () => {
    clearInterval(timerRef.current);
    setTimerSeconds(0);
    setPassedSeconds(0);
    setStatus(timerStatusConst.unset);
    deleteTimer(user!.uid, timer!.id);
  };

  // タイマーがセットされたかを監視
  useEffect(() => {
    // タイマー分が指定されているか、動作中ならタイマーをセットする
    if (timerSeconds === 0 || status !== timerStatusConst.working) return;
    timerRef.current = setInterval(() => {
      setPassedSeconds((prev) => (prev < timerSeconds ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerSeconds, status]);

  // タイマー動作中監視
  useEffect(() => {
    // タイマーが動作中に、指定時間以上経過したら対象
    if (!(status === timerStatusConst.working && passedSeconds >= timerSeconds)) return;
    clearInterval(timerRef.current);
    setStatus(timerStatusConst.done);
    playAlerm();
    deleteTimer(user!.uid, timer!.id);
  }, [timerSeconds, passedSeconds, status, timer, user]);

  useEffect(() => {
    const unsubscribe = getTimer(user!.uid, setTimer);
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (timer === undefined) return;
    if (timer === null) {
      setStatus(timerStatusConst.unset);
      setTimerSeconds(0);
      setPassedSeconds(0);
    } else {
      setStatus(timer.status);
      setTimerSeconds(timer.timerSeconds);
      if (timer.status === timerStatusConst.working) {
        const nowSeconds = Math.floor(new Date().getTime() / 1000);
        const remainSeconds = timer.endAt!.seconds - nowSeconds;
        const passedSeconds = timer.timerSeconds - remainSeconds;
        setPassedSeconds(passedSeconds);
      } else {
        setPassedSeconds(timer.passedSeconds!);
      }
    }
  }, [timer]);

  if (timer === undefined) return <></>;

  return (
    <CenterContainerBox>
      <Box sx={{ maxWidth: 350, width: '100%' }}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              {title(status)}
            </Typography>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <CircularProgress
                variant="determinate"
                size="12rem"
                color={status === timerStatusConst.working ? 'success' : 'secondary'}
                value={progress(timerSeconds, passedSeconds)}
              />
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {status === timerStatusConst.working || status === timerStatusConst.stopped ? (
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

                <BaseButton onClick={() => discardTimer()}>
                  <DeleteOutlinedIcon />
                </BaseButton>
              </>
            ) : (
              <>
                {timerMinutesList.map((minutes, _) => (
                  <BaseButton key={minutes.toString()} onClick={() => startTimer(minutes * 60)}>
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
