import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';

const HomePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="Home"></HeadHelper>
      <MenuContainer isLoggedIn={true}>LOADING...</MenuContainer>
    </>
  );
};

export default HomePage;
