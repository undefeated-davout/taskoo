import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import Pomodoro from 'components/templates/Pomodoro';

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
