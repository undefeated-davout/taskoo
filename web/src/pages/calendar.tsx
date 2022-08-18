import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';

const CalendarPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="CALENDAR"></HeadHelper>
      <MenuContainer isLoggedIn={true}>CALENDAR</MenuContainer>
    </>
  );
};

export default CalendarPage;
