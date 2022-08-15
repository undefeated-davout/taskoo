import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Pomodoro: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="POMODORO"></HeadHelper>
      <LoggedIn>
        <p>POMODORO</p>
      </LoggedIn>
    </>
  );
};

export default Pomodoro;
