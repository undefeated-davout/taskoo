import type { NextPage } from 'next';

import HeadHelper from 'components/atoms/HeadHelper';
import LoggedIn from 'components/templates/LoggedIn';

const Kanban: NextPage = () => {
  return (
    <>
      <HeadHelper titleElem="KANBAN"></HeadHelper>
      <LoggedIn>KANBAN</LoggedIn>
    </>
  );
};

export default Kanban;
