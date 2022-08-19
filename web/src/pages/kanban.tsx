import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';

const KanbanPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="KANBAN" />
      <MenuContainer isLoggedIn={true}>KANBAN</MenuContainer>
    </>
  );
};

export default KanbanPage;
