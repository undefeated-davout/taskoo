import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import MenuContainer from 'containers/templates/MenuContainer';
import RoutineConsole from 'containers/templates/RoutineConsole';

const RoutinePage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="ROUTINE" />
      <MenuContainer isLoggedIn={true}>
        <RoutineConsole />
      </MenuContainer>
    </>
  );
};

export default RoutinePage;
