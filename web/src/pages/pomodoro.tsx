import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';
import Pomodoro from 'components/templates/Pomodoro';

const PomodoroPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="POMODORO" />
      <MenuContainer isLoggedIn={true}>
        <Pomodoro />
      </MenuContainer>
    </>
  );
};

export default PomodoroPage;
