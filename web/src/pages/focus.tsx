import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';

const FocusPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="FOCUS" />
      <MenuContainer isLoggedIn={true}>FOCUS</MenuContainer>
    </>
  );
};

export default FocusPage;
