import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import MenuContainer from 'components/templates/MenuContainer';
import Tasks from 'components/templates/Tasks';

const TasksPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="TASKS" />
      <MenuContainer isLoggedIn={true}>
        <Tasks />
      </MenuContainer>
    </>
  );
};

export default TasksPage;
