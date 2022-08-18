import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';

const RoutinePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="ROUTINE"></HeadHelper>
      <MenuContainer isLoggedIn={true}>ROUTINE</MenuContainer>
    </>
  );
};

export default RoutinePage;
