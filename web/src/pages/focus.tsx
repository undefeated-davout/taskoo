import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import Focus from 'containers/templates/Focus';
import MenuContainer from 'containers/templates/MenuContainer';

const FocusPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="FOCUS" />
      <MenuContainer isLoggedIn={true}>
        <Focus />
      </MenuContainer>
    </>
  );
};

export default FocusPage;
