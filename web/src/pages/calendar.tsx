import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import type { NextPage } from 'next';

const CalendarPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="CALENDAR"></HeadHelper>
      <LoggedIn>CALENDAR</LoggedIn>
    </>
  );
};

export default CalendarPage;
