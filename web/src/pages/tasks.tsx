import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import Tasks from 'components/templates/Tasks';

const TasksPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="TASKS"></HeadHelper>
      <LoggedIn>
        <Tasks></Tasks>
      </LoggedIn>
    </>
  );
};

export default TasksPage;
