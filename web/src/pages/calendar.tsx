import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Calendar: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="CALENDAR"></HeadHelper>
      <LoggedIn>
        <p>CALENDAR</p>
      </LoggedIn>
    </>
  );
};

export default Calendar;
