import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import type { NextPage } from 'next';

const RoutinePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="ROUTINE"></HeadHelper>
      <LoggedIn>ROUTINE</LoggedIn>
    </>
  );
};

export default RoutinePage;
