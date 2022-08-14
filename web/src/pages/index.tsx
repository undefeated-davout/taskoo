import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Home: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="Home"></HeadHelper>
      <LoggedIn>
        <p>test</p>
      </LoggedIn>
    </>
  );
};

export default Home;
