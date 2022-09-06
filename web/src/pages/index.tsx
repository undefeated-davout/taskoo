import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import MenuContainer from 'containers/templates/MenuContainer';

const HomePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="Home" />
      <MenuContainer isLoggedIn={true}>LOADING...</MenuContainer>
    </>
  );
};

export default HomePage;
