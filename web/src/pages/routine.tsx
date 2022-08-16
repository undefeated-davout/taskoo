import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const RoutinePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="ROUTINE"></HeadHelper>
      <LoggedIn>ROUTINE</LoggedIn>
    </>
  );
};

export default RoutinePage;
