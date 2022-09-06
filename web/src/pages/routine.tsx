import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import MenuContainer from 'containers/templates/MenuContainer';
import Routine from 'containers/templates/Routine';

const RoutinePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="ROUTINE" />
      <MenuContainer isLoggedIn={true}>
        <Routine />
      </MenuContainer>
    </>
  );
};

export default RoutinePage;
