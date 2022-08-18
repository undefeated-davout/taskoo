import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import Pomodoro from 'components/templates/Pomodoro';
import type { NextPage } from 'next';

const PomodoroPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="POMODORO"></HeadHelper>
      <LoggedIn>
        <Pomodoro></Pomodoro>
      </LoggedIn>
    </>
  );
};

export default PomodoroPage;
