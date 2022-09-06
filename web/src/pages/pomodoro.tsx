import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import MenuContainer from 'containers/templates/MenuContainer';
import Pomodoro from 'containers/templates/Pomodoro';

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
