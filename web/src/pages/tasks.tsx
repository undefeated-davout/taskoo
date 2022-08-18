import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';
import Tasks from 'components/templates/Tasks';

const TasksPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="TASKS"></HeadHelper>
      <MenuContainer isLoggedIn={true}>
        <Tasks></Tasks>
      </MenuContainer>
    </>
  );
};

export default TasksPage;
