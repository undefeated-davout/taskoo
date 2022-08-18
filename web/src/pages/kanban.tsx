import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';
import type { NextPage } from 'next';

const KanbanPage: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="KANBAN"></HeadHelper>
      <LoggedIn>KANBAN</LoggedIn>
    </>
  );
};

export default KanbanPage;
