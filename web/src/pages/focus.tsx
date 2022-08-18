import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const FocusPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="FOCUS"></HeadHelper>
      <LoggedIn>FOCUS</LoggedIn>
    </>
  );
};

export default FocusPage;
