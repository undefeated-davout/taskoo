import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const HomePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="Home"></HeadHelper>
      <LoggedIn>test</LoggedIn>
    </>
  );
};

export default HomePage;
