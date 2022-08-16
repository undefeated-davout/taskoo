import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const CalendarPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="CALENDAR"></HeadHelper>
      <LoggedIn>CALENDAR</LoggedIn>
    </>
  );
};

export default CalendarPage;
