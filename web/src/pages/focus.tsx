import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import type { NextPage } from 'next';

const FocusPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="FOCUS"></HeadHelper>
      <LoggedIn>FOCUS</LoggedIn>
    </>
  );
};

export default FocusPage;
