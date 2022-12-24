import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { UserContext } from 'pages/_app';

import BaseButton from 'components/atoms/BaseButton';
import CenterContainerBox from 'components/atoms/CenterContainerBox';

import { timerStatusType, timerType } from 'types/timer';

import { addTimer, deleteTimer, getTimer, updateTimer } from 'lib/api/timer';
import { themeColorConst, themeDisabledColorConst } from 'lib/constants/color';
import { timerStatusConst } from 'lib/constants/timer';
import { playAlerm } from 'lib/util/audio';

type PomodoroProps = {};

const timerMinutesList = [5, 10, 15, 25];

const Pomodoro = (props: PomodoroProps) => {
  const { user } = useContext(UserContext);

  // clock
  const [clocker, updateClocker] = useState(Date.now());

  const [status, setStatus] = useState<timerStatusType>(timerStatusConst.unset);
  const [passedSeconds, setPassedSeconds] = useState(0);
  const [timer, setTimer] = useState<timerType | null | undefined>(undefined);
  const timerRef = useRef<NodeJS.Timer>();

  const progress = (timerSeconds: number, passedSeconds: number) =>
    timerSeconds === 0 ? 100 : (passedSeconds * 100) / timerSeconds;

  const title = (timerStatus: number) => {
    const minutes = (seconds: number) => Math.floor(seconds / 60);
    const timeFormat = (seconds: number) => (seconds <= 60 ? `${seconds} sec` : `${minutes(seconds)} min`);

    if (timerStatus === timerStatusConst.unset || timer == null) {
      return 'SELECT A TIMER';
    } else {
      return timeFormat(timer!.timerSeconds - passedSeconds);
    }
  };

  const nowDate = () => new Date();
  const getSeconds = (date: Date) => Math.floor(date.getTime() / 1000);
  const nowSeconds = useCallback(() => getSeconds(nowDate()), []);
  const calcTimestamp = (date: Date, plusSeconds: number) => new Timestamp(getSeconds(date) + plusSeconds, 0);

  const startTimer = (seconds: number) => {
    setPassedSeconds(0);
    setStatus(timerStatusConst.working);
    addTimer(user!.uid, {
      timerSeconds: seconds,
      status: timerStatusConst.working,
      endAt: calcTimestamp(nowDate(), seconds),
    });
  };

  const pauseTimer = () => {
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
      endAt: calcTimestamp(nowDate(), timer!.timerSeconds - timer!.passedSeconds!),
    });
  };

  const discardTimer = () => {
    clearInterval(timerRef.current);
    setTimer(null);
    setPassedSeconds(0);
    setStatus(timerStatusConst.unset);
    deleteTimer(user!.uid, timer!.id);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => updateClocker(Date.now()), 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [clocker, user]);

  // 画面ロード時
  useEffect(() => {
    const unsubscribe = getTimer(user!.uid, setTimer);
    return () => unsubscribe();
  }, [user]);

  // タイマーがセットされたかを監視
  useEffect(() => {
    // タイマー分が指定されているか、動作中ならタイマーをセットする
    if (status !== timerStatusConst.working) return;
    timerRef.current = setInterval(() => {
      // 経過時間 = タイマー時間 - 残り時間（終了時間 - 現在時間）
      const passed = timer!.timerSeconds - (getSeconds(timer!.endAt!.toDate()) - nowSeconds());
      setPassedSeconds(passed);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [status, nowSeconds, timer]);

  // タイマー動作中監視
  useEffect(() => {
    // タイマーが動作中に、指定時間以上経過したら対象
    if (timer == null) return;
    if (!(status === timerStatusConst.working && passedSeconds >= timer?.timerSeconds)) return;
    if (passedSeconds === timer!.timerSeconds) playAlerm();
    clearInterval(timerRef.current);
    setStatus(timerStatusConst.done);
    deleteTimer(user!.uid, timer!.id);
  }, [passedSeconds, status, timer, user]);

  useEffect(() => {
    if (timer === undefined || timer === null) {
      setStatus(timerStatusConst.unset);
      setPassedSeconds(0);
    } else {
      setStatus(timer.status);
      if (timer.status === timerStatusConst.working) {
        setPassedSeconds(timer.timerSeconds - (timer.endAt!.seconds - nowSeconds()));
      } else {
        setPassedSeconds(timer.passedSeconds!);
      }
    }
  }, [nowSeconds, timer]);

  if (timer === undefined) return <></>;

  return (
    <CenterContainerBox>
      <Box sx={{ maxWidth: 359, width: '100%' }}>
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" align="center">
              {dayjs(clocker).format('hh:mm A')}
            </Typography>
            <Box sx={{ mt: 1 }}></Box>
            <Typography variant="h5" component="div" align="center">
              {title(status)}
            </Typography>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <CircularProgress
                variant="determinate"
                size="12rem"
                style={{ color: status === timerStatusConst.working ? themeColorConst : themeDisabledColorConst }}
                value={progress(timer?.timerSeconds ?? 0, passedSeconds)}
              />
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {status === timerStatusConst.working || status === timerStatusConst.stopped ? (
              <>
                {status === timerStatusConst.working ? (
                  <BaseButton color="error" onClick={() => pauseTimer()}>
                    <PauseCircleOutlineIcon />
                  </BaseButton>
                ) : (
                  <BaseButton
                    sx={{
                      'background-color': themeColorConst,
                      '&:hover': { 'background-color': themeColorConst },
                    }}
                    onClick={() => resumeTimer()}
                  >
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
