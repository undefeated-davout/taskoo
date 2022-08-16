import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const TasksPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="TASKS"></HeadHelper>
      <LoggedIn>TASKS</LoggedIn>
    </>
  );
};

export default TasksPage;
