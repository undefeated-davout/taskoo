import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';

import Kanban from 'containers/templates/Kanban';
import MenuContainer from 'containers/templates/MenuContainer';

const KanbanPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="KANBAN" />
      <MenuContainer isLoggedIn={true}>
        <Kanban />
      </MenuContainer>
    </>
  );
};

export default KanbanPage;
